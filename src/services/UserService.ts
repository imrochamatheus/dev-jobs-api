import {prisma} from "../prisma";

import {
	UserResponse,
	UserCreateRequest,
	UserCreateResponse,
} from "../models/interfaces/user.interfaces";
import {ApiError} from "../helpers/apiError";
import {IUserRepository, userRepository} from "../repositories/userRepository";

export interface IUserService {
	createUser(data: UserCreateRequest): Promise<UserCreateResponse | void>;
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
	): Promise<UserCreateResponse | void> {
		const user = await this._userRepository.getUserByEmail(userData.email);

		if (user) {
			throw new ApiError(409, "Este e-mail já está cadastrado");
		}

		const createdUser = await prisma.user.create({
			data: userData,
		});

		return {
			id: createdUser.id,
			email: createdUser.email,
			name: `${createdUser.first_name} ${createdUser.last_name}`,
		};
	}

	public async getAllUsers(): Promise<UserResponse[]> {
		const users = await prisma.user.findMany();

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
