import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Root from "./root";
import Login from "./login";
import Register from "./register";

function App()
{
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Root/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register/>} />
			</Routes>
		</Router>
	);
}

export default App
