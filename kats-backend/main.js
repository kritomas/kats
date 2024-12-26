import express from "express";
import cors from "cors";

const PORT = 42069;

const server = express();

server.use(cors());

server.use(express.static("../kats-frontend/dist"));

server.listen(PORT, () =>
{
	console.log("Kats backend listening at " + PORT);
});