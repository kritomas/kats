import { useNavigate, Link } from "react-router";
import "./main.css";
import "./createroom.css";
import { routeToRoom } from "./util.js";

function CreateRoom()
{
	const navigate = useNavigate();

	async function handleCreate(event)
	{
		event.preventDefault();
		const form = new FormData(event.target);
		let data = Object.fromEntries(form.entries());
		data["is_public"] = (data["is_public"] !== undefined);
		data["user_id"] = sessionStorage.userid;
		try
		{
			const response = await fetch("/api/room",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			const body = await response.json();
			navigate(routeToRoom(body.id));
		}
		catch (error)
		{
			navigate("/error");
			throw error;
		}
	}

	return (
		<div className="form-div">
			<h2>KATS - Create Room</h2>
			<form id="create-form" onSubmit={handleCreate}>
				<label>Is Public:</label>
				<input type="checkbox" id="is_public" name="is_public" />
				<br/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default CreateRoom;