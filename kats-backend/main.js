import express from "express";
import cors from "cors";

import {createUser, getUser} from "./database.js";

const PORT = 42069;

const app = express();

app.use(cors());
app.use(express.json());

app.put("/api/user", async (req, res, next) =>
{
	try
	{
		const {username, password} = req.body;
		const user = await getUser(username, password);
		if (user === undefined) res.status(404).send("Not found");
		else res.status(200).send(user);
	}
	catch (e)
	{
		next(e);
	}
});

app.post("/api/user", async (req, res, next) =>
{
	try
	{
		const {username, password} = req.body;
		const user = await createUser(username, password);
		if (user === undefined) res.status(404).send("Not found");
		else res.status(201).send(user);
	}
	catch (e)
	{
		next(e);
	}
});

app.use(express.static("../kats-frontend/dist"));

/* // TODO: Necessary for react routes to work correctly, but needs absolute paths to work.
app.use(express.static("/var/kats/kats-frontend/dist"));

app.get('*', (req, res) =>
{
	res.sendFile("/var/kats/kats-frontend/dist/index.html");
});*/

app.listen(PORT, () =>
{
	console.log("Kats backend listening at " + PORT);
});