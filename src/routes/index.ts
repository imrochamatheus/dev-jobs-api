import {Router} from "express";
import USERS_ROUTES from "./users";

const ROUTES = Router();

ROUTES.use("/users", USERS_ROUTES);

export default ROUTES;
