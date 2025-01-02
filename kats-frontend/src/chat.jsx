import "./main.css";
import "./chat.css";
import Header from "./header";
import Footer from "./footer";
import Talker from "./talker";

function Chat()
{
	const urlParams = new URL(window.location.toLocaleString()).searchParams;
	let room = urlParams.get("chat");

	return (
		<div className="body-div">
			<Header/>
			<div className="roominfo-ribbon">
				<span>Chatting in room <b>{room}</b></span>
			</div>
			<main>
				 <Talker chatId={room}/>
			</main>
			<Footer/>
		</div>
	);
}

export default Chat;