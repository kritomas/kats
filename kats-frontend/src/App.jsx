import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Root from "./root";
import Login from "./login";
import Logout from "./logout";
import Register from "./register";
import Chat from "./chat";
import CreateRoom from "./createroom";
import CreateWhitelist from "./createwhitelist";
import RemoveWhitelist from "./removewhitelist";

function App()
{
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Root/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/logout" element={<Logout/>} />
				<Route path="/register" element={<Register/>} />
				<Route path="/chat" element={<Chat/>} />
				<Route path="/createroom" element={<CreateRoom/>} />
				<Route path="/createwhitelist" element={<CreateWhitelist/>} />
				<Route path="/removewhitelist" element={<RemoveWhitelist/>} />
			</Routes>
		</Router>
	);
}

export default App
