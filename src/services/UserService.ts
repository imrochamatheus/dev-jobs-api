import {
	UserResponse,
	UserCreateRequest,
} from "../models/interfaces/user.interfaces";

import {ApiError} from "../helpers/apiError";
import {IUserRepository, userRepository} from "../repositories/userRepository";

export interface IUserService {
	createUser(data: UserCreateRequest): Promise<UserResponse | void>;
	getAllUsers(): Promise<UserResponse[]>;
	getUserById(id: string): Promise<UserResponse>;
}

export class UserService implements IUserService {
	private static _instance: UserService | null = null;
	private _userRepository: IUserRepository;

	private constructor(userRepository: IUserRepository) {
		this._userRepository = userRepository;
	}

	public static getInstance(repository: IUserRepository): UserService {
		if (!UserService._instance) {
			UserService._instance = new UserService(repository);
		}
		return UserService._instance;
	}

	public async createUser(
		userData: UserCreateRequest
	): Promise<UserResponse | void> {
		const user = await this._userRepository.getUserByEmail(userData.email);

		if (user) {
			throw new ApiError(409, "Este e-mail já está em uso!");
		}

		const createdUser = await this._userRepository.createUser(userData);

		if (!createdUser) {
			throw new ApiError(500, "Erro ao criar usuário!");
		}

		return createdUser;
	}

	public async getAllUsers(): Promise<UserResponse[]> {
		const users = await this._userRepository.getAllUsers();

		return users;
	}

	public async getUserById(id: string): Promise<UserResponse> {
		const user = await this._userRepository.getUserById(id);

		if (!user) {
			throw new ApiError(404, "Usuário não encontrado!");
		}

		return user;
	}
}

export const userService: UserService = UserService.getInstance(userRepository);
