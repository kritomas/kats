import {createMessage, listMessages} from "./database.js";

let talkers = {};

async function updateTalker(socket)
{
	socket.emit("COMM_MESSAGES", {messages: await listMessages(talkers[socket.id]["talker"]["chat"])});
}

export function createTalker(socket, talker)
{
	talkers[socket.id] = {socket: socket, talker: talker};
	updateTalker(socket);
}