import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./main.css";
import "./talker.css";

function Talker({chatId})
{
	const [messageView, setMessageView] = useState(<div/>);

	useEffect(() =>
	{
		const socket = io();

		socket.on("connect", () =>
		{
			console.log("Connected to server");
		});
		socket.on("disconnect", () =>
		{
			console.log("Disconnected from server");
		});
		socket.on("COMM_MESSAGES", (incoming) =>
		{
			console.log(incoming);
			const messages = incoming["messages"].map((val) =>
			{
				console.log(val);
				return (
					<div className="message">
						<p><b>{val.user}</b> at <b>{val.date}</b>:</p>
						<p>{val.message}</p>
					</div>
				);
			});
			let result = <div className="message-list">{messages}</div>
			setMessageView(result);
		});

		socket.emit("COMM_ENTER", {user: sessionStorage.userid, chat: chatId});
	}, []);

	return (
		<div className="chat">
			{messageView}
		</div>
	)
}

export default Talker;