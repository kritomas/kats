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
import Error from "./error";

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
				<Route path="/error" element={<Error/>} />
			</Routes>
		</Router>
	);
}

export default App
