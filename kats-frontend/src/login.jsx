import "./main.css";
import "./login.css";

function Login()
{
	async function handleLogin(event)
	{
		event.preventDefault();
		const form = new FormData(event.target);
		const data = Object.fromEntries(form.entries());
		const response = await fetch("/api/user",
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		const body = await response.json();
		sessionStorage.userid = body.id;
		sessionStorage.username = body.username;
		window.location.replace("/");
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
			<a href="/register">Register</a>
		</div>
	);
}

export default Login;