import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./main.css";
import "./roomlist.css";
import { routeToRoom, routeToCreateWhitelist } from "./util.js";

function RoomList()
{
	const [list, setList] = useState(<div/>);

	useEffect(() =>
	{
		async function construct()
		{
			const data = { user_id: sessionStorage.userid };
			const response = await fetch("/api/room",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			const body = await response.json();

			const rooms = body.map((val) =>
			{
				let roomRoute = routeToRoom(val.id);
				let createWhitelistRoute = routeToCreateWhitelist(val.id);

				return (
					<div className="room-tile">
						<p>Room <b>{val.id}</b></p>
						<Link to={roomRoute}>Enter</Link>
						<Link to={createWhitelistRoute}>Add Whitelist</Link>
					</div>
				);
			});
			let result = <div className="roomlist">{rooms}</div>
			setList(result);
		}
		construct();
	}, []);

	return (
		<div>
			{list}
		</div>
	);
}

export default RoomList;