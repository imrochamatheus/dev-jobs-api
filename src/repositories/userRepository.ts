import {
	UserResponse,
	UserCreateRequest,
} from "../models/interfaces/user.interfaces";
import {ExtendedPrismaClient, prisma} from "../prisma";

export interface IUserRepository {
	getAllUsers(): Promise<UserResponse[]>;
	getUserById(id: string): Promise<UserResponse | null>;
	getUserByEmail(email: string): Promise<UserResponse | null>;
	createUser(data: UserCreateRequest): Promise<UserResponse>;
}

class UserRepository implements IUserRepository {
	private static _instance: UserRepository;

	private constructor(private readonly _prisma: ExtendedPrismaClient) {}

	private selectUserFields(): Record<keyof UserResponse, boolean> {
		return {
			id: true,
			name: true,
			email: true,
			recruiter: true,
			created_at: true,
			updated_at: true,
		};
	}
	public async createUser(data: UserCreateRequest): Promise<UserResponse> {
		return await this._prisma.user.create({
			data,
			select: this.selectUserFields(),
		});
	}

	public async getAllUsers(): Promise<UserResponse[]> {
		return await this._prisma.user.findMany({
			select: this.selectUserFields(),
		});
	}

	public async getUserById(id: string): Promise<UserResponse | null> {
		return this._prisma.user.findFirst({
			where: {
				id,
			},
			select: this.selectUserFields(),
		});
	}

	public async getUserByEmail(email: string): Promise<UserResponse | null> {
		return await this._prisma.user.findUnique({
			where: {
				email,
			},
			select: this.selectUserFields(),
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
