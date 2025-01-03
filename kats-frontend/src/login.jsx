import { useNavigate, Link } from "react-router";
import "./main.css";
import "./login.css";

function Login()
{
	const navigate = useNavigate();

	async function handleLogin(event)
	{
		event.preventDefault();
		const form = new FormData(event.target);
		const data = Object.fromEntries(form.entries());
		try
		{
			const response = await fetch("/api/user",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			if (!response.ok) throw response;
			const body = await response.json();
			sessionStorage.userid = body.id;
			sessionStorage.username = body.username;
			navigate("/");
		}
		catch (error)
		{
			navigate("/error");
			throw error;
		}
	}

	return (
		<div className="form-div">
			<h2>KATS - Login</h2>
			<form id="login-form" onSubmit={handleLogin}>
				<label>Username:</label>
				<input type="text" id="username" name="username" required/>
				<br/>
				<label>Password:</label>
				<input type="password" id="password" name="password" required/>
				<br/>
				<button type="submit">Submit</button>
			</form>
			<Link to="/register">Register</Link>
		</div>
	);
}

export default Login;