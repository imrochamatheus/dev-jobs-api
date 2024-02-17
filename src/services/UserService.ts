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
	getUserById(id: string): Promise<UserResponse | null>;
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
		data: UserCreateRequest
	): Promise<UserCreateResponse | void> {
		const user = await this._userRepository.getUserByEmail(data.email);

		if (user) {
			throw new ApiError("Este e-mail já está cadastrado", 409);
		}

		const {id, email, first_name, last_name} = await prisma.user.create({
			data,
		});

		return {
			id,
			email,
			name: `${first_name} ${last_name}`,
		};
	}

	public async getAllUsers(): Promise<UserResponse[]> {
		const users = await prisma.user.findMany();

		return users;
	}

	public async getUserById(id: string): Promise<UserResponse | null> {
		const user = await prisma.user.findFirst({
			where: {
				id,
			},
		});

		return user;
	}
}

export const userService: UserService = UserService.getInstance(userRepository);
