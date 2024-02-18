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
		const {id, email, name} = await prisma.user.create({
			data,
		});

		const response: UserCreateResponse = {
			id,
			name,
			email,
		};

		return response;
	}
	public async getAllUsers(): Promise<UserResponse[]> {
		return await prisma.user.findMany();
	}

	public async getUserById(id: string): Promise<UserResponse | null> {
		return prisma.user.findFirst({
			where: {
				id,
			},
		});
	}

	public async getUserByEmail(email: string): Promise<UserResponse | null> {
		return await prisma.user.findUnique({
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
