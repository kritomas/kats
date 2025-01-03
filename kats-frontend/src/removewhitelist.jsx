import { useNavigate, Link } from "react-router";
import "./main.css";
import "./removewhitelist.css";

function RemoveWhitelist()
{
	const navigate = useNavigate();

	async function handleRemoveWhitelist(event)
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
				method: "DELETE",
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
			<h2>KATS - Remove User From Whitelist</h2>
			<form id="removewhitelist-form" onSubmit={handleRemoveWhitelist}>
				<label>Username:</label>
				<input type="text" id="username" name="username" required/>
				<br/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default RemoveWhitelist;