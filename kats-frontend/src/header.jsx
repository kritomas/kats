import { Link } from "react-router";
import "./main.css";
import "./header.css";

function Header()
{
	let userinfo = <span/>
	if (sessionStorage.username !== undefined)
	{
		userinfo = <span>Logged in as <b>{sessionStorage.username}</b><Link to="/logout">Logout</Link></span>
	}

	return (
		<header>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			{userinfo}
		</header>
	);
}

export default Header;