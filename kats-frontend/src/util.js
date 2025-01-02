export function routeToRoom(room_id)
{
	return "/chat?chat=" + room_id;
}

export function routeToCreateWhitelist(room_id)
{
	return "/createwhitelist?roomid=" + room_id;
}

export function routeToRemoveWhitelist(room_id)
{
	return "/removewhitelist?roomid=" + room_id;
}