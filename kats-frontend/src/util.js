export function routeToRoom(room_id)
{
	return "/chat?chat=" + room_id;
}

export function routeToCreateWhitelist(room_id)
{
	return "/createwhitelist?roomid=" + room_id;
}