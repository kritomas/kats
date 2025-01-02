import { useNavigate } from "react-router";
import { useEffect } from "react";
import "./main.css";
import Header from "./header";
import Footer from "./footer";

function Logout()
{
	const navigate = useNavigate();

	useEffect(() =>
	{
		delete sessionStorage.userid;
		delete sessionStorage.username;
		navigate("/");
	}, []);

	return (
		<div className="body-div">
			<Header/>
			<main>
				<div>
					Logging out...
				</div>
			</main>
			<Footer/>
		</div>
	);
}

export default Logout