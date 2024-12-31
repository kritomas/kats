import "./main.css";
import Header from "./header";
import Footer from "./footer";
import Talker from "./talker";

function Chat()
{
	const urlParams = new URL(window.location.toLocaleString()).searchParams;

	return (
		<div className="body-div">
			<Header/>
			<main>
				 <Talker chatId={urlParams.get("chat")}/>
			</main>
			<Footer/>
		</div>
	);
}

export default Chat;