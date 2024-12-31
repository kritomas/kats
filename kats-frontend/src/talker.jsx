import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./main.css";

function Talker({chatId})
{
	useEffect(() =>
	{
		const socket = io("localhost:42069");
		socket.on("connect", () =>
		{
			console.log("Connected to server");
		});
		socket.on("disconnect", () =>
		{
			console.log("Disconnected from server");
		});

		socket.emit("COMM_ENTER", {user: sessionStorage.userid, chat: chatId});
	});

	return (
		<div className="chat-div">
			<p>{chatId}</p>
		</div>
	)
}

export default Talker;