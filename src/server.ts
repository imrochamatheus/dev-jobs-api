import express from "express";
import ROUTES from "./routes";

const SERVER = express();

SERVER.use(express.json());
SERVER.use("/api", ROUTES);

export default SERVER;
