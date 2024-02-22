import "express-async-errors";
import express from "express";
import morgan from "morgan";

import ROUTES from "../routes";
import {errorHandlerMiddleware} from "../middlewares/errorHandler.middleware";

const SERVER = express();

SERVER.use(morgan("dev"));
SERVER.use(express.json());
SERVER.use("/api", ROUTES);
SERVER.use(errorHandlerMiddleware);

export default SERVER;
