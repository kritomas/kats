import { useNavigate } from "react-router";
import { useEffect } from "react";
import "./main.css";
import Header from "./header";
import Footer from "./footer";

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

	return (
		<div className="body-div">
			<Header/>
			<main>
				 BRYNDZOVÉ HALUŠKY
			</main>
			<Footer/>
		</div>
	);
}

export default Root