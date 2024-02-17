import {Request, Response, Router} from "express";

import {userController} from "../controllers/UserController";

const USER_ROUTER = Router();

USER_ROUTER.get("/", (req: Request, res: Response) => {
	userController.getAllUsers(req, res);
});

USER_ROUTER.post("/", (req: Request, res: Response) => {
	userController.createUser(req, res);
});

export {USER_ROUTER};
