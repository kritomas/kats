import { Link } from "react-router";
import "./main.css";
import "./header.css";

function Header()
{
	return (
		<header>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
		</header>
	);
}

export default Header;