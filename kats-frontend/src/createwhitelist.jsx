import { useNavigate, Link } from "react-router";
import "./main.css";
import "./createwhitelist.css";

function CreateWhitelist()
{
	const navigate = useNavigate();

	async function handleCreateWhitelist(event)
	{
		event.preventDefault();
		const urlParams = new URL(window.location.toLocaleString()).searchParams;
		let room = urlParams.get("roomid");
		const form = new FormData(event.target);
		let data = Object.fromEntries(form.entries());
		data["room_id"] = room;
		data["user_id"] = sessionStorage.userid;
		try
		{
			const response = await fetch("/api/whitelist",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			if (!response.ok) throw response;
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
			<h2>KATS - Add User To Whitelist</h2>
			<form id="createwhitelist-form" onSubmit={handleCreateWhitelist}>
				<label>Username:</label>
				<input type="text" id="username" name="username" required/>
				<br/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default CreateWhitelist;