import {Request, Response, Router} from "express";

import {userController} from "../controllers/UserController";

const USERS_ROUTES = Router();

USERS_ROUTES.get("/", (req: Request, res: Response) => {
	userController.getAllUsers(req, res);
});

USERS_ROUTES.post("/", (req: Request, res: Response) => {
	userController.createUser(req, res);
});

export default USERS_ROUTES;
