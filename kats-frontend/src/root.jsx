import { useNavigate, Link } from "react-router";
import { useEffect } from "react";
import "./main.css";
import "./root.css";
import Header from "./header";
import Footer from "./footer";
import RoomList from "./roomlist";

function Root()
{
	const navigate = useNavigate();

	useEffect(() =>
	{
		if (sessionStorage.userid === undefined)
		{
			navigate("/login");
			return;
		}
	});

	let roomlist;
	if (sessionStorage.userid === undefined)
	{
		roomlist = <div/>
	}
	else
	{
		roomlist = <RoomList/>
	}

	return (
		<div className="body-div">
			<Header/>
			<main>
				<div className="roomcreate-ribbon">
					<Link to="/createroom">Create Room</Link>
				</div>
				{roomlist}
			</main>
			<Footer/>
		</div>
	);
}

export default Root