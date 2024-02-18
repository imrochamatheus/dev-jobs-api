import {
	UserResponse,
	UserCreateRequest,
	UserCreateResponse,
} from "../models/interfaces/user.interfaces";
import {ExtendedPrismaClient, prisma} from "../prisma";

export interface IUserRepository {
	getAllUsers(): Promise<UserResponse[]>;
	getUserById(id: string): Promise<UserResponse | null>;
	getUserByEmail(email: string): Promise<UserResponse | null>;
	createUser(data: UserCreateRequest): Promise<UserCreateResponse>;
}

class UserRepository implements IUserRepository {
	private static _instance: UserRepository;

	private constructor(private readonly _prisma: ExtendedPrismaClient) {}

	public async createUser(
		data: UserCreateRequest
	): Promise<UserCreateResponse> {
		const {id, email, name} = await this._prisma.user.create({
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
		return await this._prisma.user.findMany();
	}

	public async getUserById(id: string): Promise<UserResponse | null> {
		return this._prisma.user.findFirst({
			where: {
				id,
			},
		});
	}

	public async getUserByEmail(email: string): Promise<UserResponse | null> {
		return await this._prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	public static getInstance(prisma: ExtendedPrismaClient): UserRepository {
		if (!UserRepository._instance) {
			UserRepository._instance = new UserRepository(prisma);
		}

		return UserRepository._instance;
	}
}

export const userRepository: UserRepository =
	UserRepository.getInstance(prisma);
