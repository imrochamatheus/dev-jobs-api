import {Request, Response} from "express";
import {UserService, userService} from "../services/UserService";
import {User, UserCreateRequest} from "../models/interfaces/user.interfaces";

class UserController {
	private static _instance: UserController;
	private constructor(private readonly userService: UserService) {}

	public static getInstance(): UserController {
		if (!UserController._instance) {
			UserController._instance = new UserController(userService);
		}
		return UserController._instance;
	}

	public async createUser(
		req: Request<{}, {}, UserCreateRequest>,
		res: Response
	): Promise<void> {
		const userData: UserCreateRequest = req.body;

		try {
			const response = await this.userService.createUser(userData);

			res.status(201).send(response);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async getAllUsers(_: Request, res: Response<User[]>): Promise<void> {
		const users: User[] = await this.userService.getAllUsers();

		res.status(200).send(users);
	}
}

export const userController = UserController.getInstance();
