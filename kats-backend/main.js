import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import { createUser, getUser,
         createRoom, getRoom, getAllRooms,
         createWhitelist, removeWhitelist } from "./database.js";

import { createTalker, registerMessage, removeTalker } from "./chatman.js";

const PORT = 42069;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.put("/api/user", async (req, res, next) =>
{
	try
	{
		const {username, password} = req.body;
		const user = await getUser(username, password);
		if (user === undefined) res.status(404).send("Not found");
		else res.status(200).send(user);
	}
	catch (e)
	{
		next(e);
	}
});
app.post("/api/user", async (req, res, next) =>
{
	try
	{
		const {username, password} = req.body;
		const user = await createUser(username, password);
		if (user === undefined) res.status(404).send("Not found");
		else res.status(201).send(user);
	}
	catch (e)
	{
		next(e);
	}
});

app.put("/api/room", async (req, res, next) =>
{
	try
	{
		const {user_id} = req.body;
		const rooms = await getAllRooms(user_id);
		if (rooms === undefined) res.status(404).send("Not found");
		else res.status(200).send(rooms);
	}
	catch (e)
	{
		next(e);
	}
});
app.post("/api/room", async (req, res, next) =>
{
	try
	{
		const {user_id, is_public} = req.body;
		const room = await createRoom(user_id, is_public);
		if (room === undefined) res.status(404).send("Not found");
		else res.status(201).send(room);
	}
	catch (e)
	{
		next(e);
	}
});

app.post("/api/whitelist", async (req, res, next) =>
{
	try
	{
		const {username, room_id, user_id} = req.body;
		const affected = await createWhitelist(username, room_id, user_id);
		if (affected > 0) res.status(201).send("");
		else res.status(404).send("Not found");
	}
	catch (e)
	{
		next(e);
	}
});
app.delete("/api/whitelist", async (req, res, next) =>
{
	try
	{
		const {username, room_id, user_id} = req.body;
		const affected = await removeWhitelist(username, room_id, user_id);
		if (affected > 0) res.status(200).send("");
		else res.status(404).send("Not found");
	}
	catch (e)
	{
		next(e);
	}
});

app.use(express.static("../kats-frontend/dist"));

/* // TODO: Necessary for react routes to work correctly, but needs absolute paths to work.
app.use(express.static("/var/kats/kats-frontend/dist"));

app.get('*', (req, res) =>
{
	res.sendFile("/var/kats/kats-frontend/dist/index.html");
});*/

io.on("connection", (socket) =>
{
	console.log("Talker connected: " + socket.id);

	socket.on("disconnect", () =>
	{
		removeTalker(socket);
		console.log("Talker disconnected: " + socket.id);
	});

	socket.on("COMM_ENTER", (talker) =>
	{
		createTalker(socket, talker);
	});
	socket.on("COMM_SEND", (message) =>
	{
		registerMessage(socket, message);
	});
});

server.listen(PORT, () =>
{
	console.log("Kats backend listening at " + PORT);
});