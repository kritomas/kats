import {createMessage, listMessages} from "./database.js";

let talkers = {};

async function updateTalker(socket)
{
	socket.emit("COMM_MESSAGES", {messages: await listMessages(talkers[socket.id]["talker"]["chat"])});
}
async function updateParticipants(chat)
{
	for (let k in talkers)
	{
		if (talkers[k]["talker"]["chat"] === chat)
		{
			updateTalker(talkers[k]["socket"]);
		}
	}

}

export function createTalker(socket, talker)
{
	talkers[socket.id] = {socket: socket, talker: talker};
	updateTalker(socket);
}
export function removeTalker(socket)
{
	delete talkers[socket.id];
}

export async function registerMessage(socket, message)
{
	await createMessage(talkers[socket.id]["talker"]["user"], talkers[socket.id]["talker"]["chat"], message["message"])
	await updateParticipants(talkers[socket.id]["talker"]["chat"]);
}