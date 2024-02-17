import {Request, Response} from "express";

import {
	UserResponse,
	UserCreateRequest,
} from "../models/interfaces/user.interfaces";
import {UserService, userService} from "../services/UserService";
4;

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

	public async getAllUsers(
		_: Request,
		res: Response<UserResponse[]>
	): Promise<void> {
		const users: UserResponse[] = await this.userService.getAllUsers();

		res.status(200).send(users);
	}

	public async getUserById({params}: Request, res: Response): Promise<void> {
		const user_id: string = params.id;

		const user: UserResponse | null = await this.userService.getUserById(
			user_id
		);

		res.status(200).send(user);
	}
}

export const userController: UserController = UserController.getInstance();
