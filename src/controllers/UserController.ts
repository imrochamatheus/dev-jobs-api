import {Request} from "express";

import {
	UserResponse,
	UserCreateRequest,
	UserCreateResponse,
} from "../models/interfaces/user.interfaces";
import {CustomResponse} from "../helpers/defaultResponse";
import {IUserService, userService} from "../services/UserService";

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
		res: CustomResponse<UserCreateResponse>
	): Promise<void> {
		const userData: UserCreateRequest = req.body;

		const response = await this._userService.createUser(userData);

		if (response) {
			res.status(201).send({
				message: "Criado com sucesso!",
				data: response,
			});
		}
	}

	public async getAllUsers(
		_: Request,
		res: CustomResponse<UserResponse[]>
	): Promise<void> {
		const users: UserResponse[] = await this._userService.getAllUsers();

		res.status(200).send({
			message: "Carregado com sucesso!",
			data: users,
		});
	}

	public async getUserById(
		{params}: Request,
		res: CustomResponse<UserResponse>
	): Promise<void> {
		const user_id: string = params.id;

		const user: UserResponse = await this._userService.getUserById(user_id);

		res.status(200).send({
			message: "Carregado com sucesso!",
			data: user,
		});
	}
}

export const userController: UserController = UserController.getInstance();
