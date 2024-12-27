import "./main.css";
import "./login.css";

function Login()
{
	return (
		<div class="form-div">
			<h2>KATS - Login</h2>
			<form id="login-form">
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