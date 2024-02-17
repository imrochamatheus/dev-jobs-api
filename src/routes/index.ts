import {Router} from "express";

import {USER_ROUTER} from "./users";
import {JOBS_ROUTER} from "./jobs";

const ROUTES = Router();

ROUTES.use("/users", USER_ROUTER);
ROUTES.use("/jobs", JOBS_ROUTER);

export default ROUTES;
