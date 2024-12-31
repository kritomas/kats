import "./main.css";
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
			<main>
				 <Talker chatId={room}/>
			</main>
			<Footer/>
		</div>
	);
}

export default Chat;