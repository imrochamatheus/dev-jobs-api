import express from "express";

const PORT = 3000;
const SERVER = express();

SERVER.listen(PORT, () => {
	console.log(`Server is running in port ${PORT}`);
});
