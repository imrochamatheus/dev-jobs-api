import {Router} from "express";
import {userController} from "../controllers/UserController";

const USER_ROUTER = Router();

USER_ROUTER.get("/", userController.getAllUsers.bind(userController));
USER_ROUTER.post("/", userController.createUser.bind(userController));

export {USER_ROUTER};
