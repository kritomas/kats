import express from "express";
import cors from "cors";

const PORT = 42069;

const server = express();

server.use(cors());

server.listen(PORT, () =>
{
	console.log("Kats backend listening at " + PORT);
});