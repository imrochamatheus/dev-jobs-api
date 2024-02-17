import "express-async-errors";
import express from "express";

import ROUTES from "./routes";
import {errorHandlerMiddleware} from "./middlewares/errorHandler.middleware";

const SERVER = express();

SERVER.use(express.json());
SERVER.use("/api", ROUTES);
SERVER.use(errorHandlerMiddleware);

export default SERVER;
