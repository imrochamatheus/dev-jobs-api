import {Router} from "express";
import {authController} from "../controllers/AuthController";

const AUTH_ROUTER = Router();

AUTH_ROUTER.post("", authController.login.bind(authController));

export {AUTH_ROUTER};
