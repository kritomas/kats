import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Root from "./root";
import Login from "./login";
import Register from "./register";
import Chat from "./chat";
import CreateRoom from "./createroom";
import CreateWhitelist from "./createwhitelist";

function App()
{
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Root/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register/>} />
				<Route path="/chat" element={<Chat/>} />
				<Route path="/createroom" element={<CreateRoom/>} />
				<Route path="/createwhitelist" element={<CreateWhitelist/>} />
			</Routes>
		</Router>
	);
}

export default App
