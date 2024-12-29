import fs from "fs";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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

export async function createRoom(is_public = true)
{
	const id = uuidv4();
	const result = await pool.query("insert into Room (id, is_public) values (?, ?);", [id, is_public]);
	return await getRoom(id);
}
export async function getRoom(room_id)
{
	let result = await pool.query("select Room.id from Room where id = ?;", [room_id]);
	const rows = result[0];
	return rows;
}
export async function getAllRooms(user_id)
{
	let result = await pool.query("select Room.id from Room left join Whitelist on Room.id = Whitelist.Room_id and Whitelist.User_id = ? where Whitelist.id is not null or Room.is_public;", [user_id]);
	const rows = result[0];
	return rows;
}