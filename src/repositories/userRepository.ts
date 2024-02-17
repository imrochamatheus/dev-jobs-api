import {prisma} from "../prisma";
import {
	UserResponse,
	UserCreateRequest,
	UserCreateResponse,
} from "../models/interfaces/user.interfaces";

export interface IUserRepository {
	getAllUsers(): Promise<UserResponse[]>;
	getUserById(id: string): Promise<UserResponse | null>;
	getUserByEmail(email: string): Promise<UserResponse | null>;
	createUser(data: UserCreateRequest): Promise<UserCreateResponse>;
}

class UserRepository implements IUserRepository {
	private static _instance: UserRepository;

	private constructor() {}

	public async createUser(
		data: UserCreateRequest
	): Promise<UserCreateResponse> {
		const {id, email, first_name, last_name} = await prisma.user.create({
			data,
		});

		const response: UserCreateResponse = {
			id,
			email,
			name: first_name + " " + last_name,
		};

		return response;
	}
	public async getAllUsers(): Promise<UserResponse[]> {
		const users = await prisma.user.findMany();

		return users;
	}
	public async getUserById(id: string): Promise<UserResponse | null> {
		const user = prisma.user.findFirst({
			where: {
				id,
			},
		});

		return user;
	}

	public async getUserByEmail(email: string): Promise<UserResponse | null> {
		return await prisma.user.findUniqueOrThrow({
			where: {
				email,
			},
		});
	}

	public static getInstance(): UserRepository {
		if (!UserRepository._instance) {
			UserRepository._instance = new UserRepository();
		}

		return UserRepository._instance;
	}
}

export const userRepository: UserRepository = UserRepository.getInstance();
