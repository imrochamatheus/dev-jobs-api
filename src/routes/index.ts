import {Router} from "express";

import {USER_ROUTER} from "./users";
import {JOBS_ROUTER} from "./jobs";
import {AUTH_ROUTER} from "./auth";
import {authMiddleware} from "../middlewares/auth.middleware";

const ROUTES = Router();

ROUTES.use("/login", AUTH_ROUTER);
ROUTES.use("/jobs", [authMiddleware], JOBS_ROUTER);
ROUTES.use("/users", USER_ROUTER);

export default ROUTES;
