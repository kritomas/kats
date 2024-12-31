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

export async function createRoom(owner_id, is_public = true)
{
	const id = uuidv4();
	const result = await pool.query("insert into Room (id, Owner_id, is_public) values (?, ?, ?);", [id, owner_id, is_public]);
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
	let result = await pool.query("select Room.id from Room left join Whitelist on Room.id = Whitelist.Room_id and Whitelist.User_id = ? where Whitelist.id is not null or Room.is_public or Room.Owner_id = ?;", [user_id, user_id]);
	const rows = result[0];
	return rows;
}

export async function createWhitelist(username, room_id, owner_id)
{
	const result = await pool.query("insert into Whitelist (User_id, Room_id) select (select id from User where username = ?), (select id from Room where id = ? and Owner_id = ?);", [username, room_id, owner_id]);
	return result[0].affectedRows;
}
export async function removeWhitelist(username, room_id, owner_id)
{
	const result = await pool.query("delete Whitelist from Whitelist inner join Room on Whitelist.Room_id = Post.id inner join User on User.id = Whitelist.User_id where Whitelist.Room_id = ? and User.username = ? and Room.Owner_id = ?;", [room_id, username, owner_id]);
	return result[0].affectedRows;
}

export async function createMessage(sender_id, room_id, text)
{
	const result = await pool.query("insert into Message (Sender_id, Room_id, message) values (?, ?, ?);", [sender_id, room_id, text]);
	return result[0].affectedRows;
}