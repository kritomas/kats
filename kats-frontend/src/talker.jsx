import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./main.css";
import "./talker.css";

const socket = io();

function Talker({chatId})
{
	const [messageView, setMessageView] = useState(<div/>);

	useEffect(() =>
	{
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
			const messages = incoming["messages"].map((val) =>
			{
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

	function handleSend(event)
	{
		event.preventDefault();
		const form = new FormData(event.target);
		const data = Object.fromEntries(form.entries());
		socket.emit("COMM_SEND", data);
		event.target.reset();
	}

	return (
		<div className="chat">
			{messageView}
			<div className="prompt-div">
				<form onSubmit={handleSend}>
					<input type="text" id="message" className="message-prompt" name="message" required/>
					<br/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	)
}

export default Talker;