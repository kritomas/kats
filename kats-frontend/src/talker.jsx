import { useState, useEffect } from "react";
import "./main.css";

function Talker({chatId})
{
	return (
		<div className="chat-div">
			<p>{chatId}</p>
		</div>
	)
}

export default Talker;