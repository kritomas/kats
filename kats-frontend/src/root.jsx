import { useNavigate } from "react-router";
import { useEffect } from "react";
import "./main.css";
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
				 {roomlist}
			</main>
			<Footer/>
		</div>
	);
}

export default Root