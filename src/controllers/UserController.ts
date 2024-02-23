import {Request} from "express";

import {
	UserResponse,
	UserCreateRequest,
} from "../models/interfaces/user.interfaces";
import {IUserService, userService} from "../services/UserService";
import {ApiResponse} from "../models/interfaces/response.interfaces";

export class UserController {
	private static _instance: UserController;
	private _userService: IUserService;

	private constructor(userService: IUserService) {
		this._userService = userService;
	}

	public static getInstance(): UserController {
		if (!UserController._instance) {
			UserController._instance = new UserController(userService);
		}

		return UserController._instance;
	}

	public async createUser(
		req: Request<{}, {}, UserCreateRequest>,
		res: ApiResponse<UserResponse>
	): Promise<void> {
		const userData: UserCreateRequest = req.body;

		const response = await this._userService.createUser(userData);

		if (response) {
			res.status(201).send({
				success: true,
				message: "Criado com sucesso!",
				data: response,
			});
		}
	}

	public async getAllUsers(
		_: Request,
		res: ApiResponse<UserResponse[]>
	): Promise<void> {
		const users: UserResponse[] = await this._userService.getAllUsers();

		res.status(200).send({
			success: true,
			message: "Carregado com sucesso!",
			data: users,
		});
	}

	public async getUserById(
		{params}: Request,
		res: ApiResponse<UserResponse>
	): Promise<void> {
		const user_id: string = params.id;

		const user: UserResponse = await this._userService.getUserById(user_id);

		res.status(200).send({
			success: true,
			message: "Carregado com sucesso!",
			data: user,
		});
	}
}

export const userController: UserController = UserController.getInstance();
