import fs from "fs";
import mysql from "mysql2";
import bcrypt from "bcrypt";

const pool = mysql.createPool(JSON.parse(fs.readFileSync("./sql_credentials.json", "utf8"))).promise();

export async function getUser(username, password)
{
	let result = await pool.query("select password_hash from User where username = ?;", [username]);
	if (result[0].length <= 0) return undefined;
	const password_hash = result[0][0]["password_hash"];
	if (!await bcrypt.compare(password, password_hash))
	{
		return undefined;
	}
	result = await pool.query("select id, username from User where username = ?;", [username]);
	const rows = result[0];
	return rows[0];
}
export async function createUser(username, password)
{
	const password_hash = await bcrypt.hash(password, 10);
	const result = await pool.query("insert into User (username, password_hash) values (?, ?);", [username, password_hash]);
	return await getUser(username, password);
}