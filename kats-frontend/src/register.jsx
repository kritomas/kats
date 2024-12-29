import { useNavigate, Link } from "react-router";
import "./main.css";
import "./login.css";

function Login()
{
	const navigate = useNavigate();

	async function handleRegister(event)
	{
		event.preventDefault();
		const form = new FormData(event.target);
		const data = Object.fromEntries(form.entries());
		const response = await fetch("/api/user",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		const body = await response.json();
		sessionStorage.userid = body.id;
		sessionStorage.username = body.username;
		navigate("/");
	}

	return (
		<div className="form-div">
			<h2>KATS - Register</h2>
			<form id="register-form" onSubmit={handleRegister}>
				<label>Username:</label>
				<input type="text" id="username" name="username" required/>
				<br/>
				<label>Password:</label>
				<input type="password" id="password" name="password" required/>
				<br/>
				<button type="submit">Submit</button>
			</form>
			<Link to="/login">Login</Link>
		</div>
	);
}

export default Login;