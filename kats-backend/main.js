import express from "express";
import cors from "cors";

import {createUser, getUser} from "./database.js";

const PORT = 42069;

const app = express();

app.use(cors());

app.use(express.static("../kats-frontend/dist"));

app.listen(PORT, () =>
{
	console.log("Kats backend listening at " + PORT);
});