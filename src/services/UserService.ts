import {prisma} from "../prisma";

import {
	User,
	UserCreateRequest,
	UserCreateResponse,
} from "../models/interfaces/user.interfaces";

export class UserService {
	private static _instance: UserService | null = null;

	private constructor() {}

	public static getInstance(): UserService {
		if (!UserService._instance) {
			UserService._instance = new UserService();
		}
		return UserService._instance;
	}

	public async createUser(
		data: UserCreateRequest
	): Promise<UserCreateResponse> {
		const {id, email, first_name, last_name} = await prisma.user.create({
			data,
		});

		return {
			id,
			email,
			name: `${first_name} ${last_name}`,
		};
	}

	public async getAllUsers(): Promise<User[]> {
		const users = await prisma.user.findMany();

		return users;
	}
}

export const userService: UserService = UserService.getInstance();
