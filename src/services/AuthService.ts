import {User} from "@prisma/client";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";

import {ApiError} from "../helpers/apiError";
import {IUserRepository, userRepository} from "../repositories/userRepository";

export interface IAuthService {
	login(email: string, password: string): Promise<string | void>;
}

class AuthService {
	private static _instance: AuthService;

	private constructor(private readonly _userRepository: IUserRepository) {}

	public async login(email: string, password: string): Promise<string | void> {
		const user: User | null = await this._userRepository.getUserByEmail(email);
		const error = new ApiError(401, "Usuário ou senha inválidos!");

		if (!user) {
			throw error;
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw error;
		}

		const token = sign(
			{id: user.id, recruiter: user.recruiter},
			process.env.JWT_SECRET as string
		);

		return token;
	}

	public static getInstance(userRepository: IUserRepository): AuthService {
		if (!AuthService._instance) {
			AuthService._instance = new AuthService(userRepository);
		}

		return AuthService._instance;
	}
}

export const authService: AuthService = AuthService.getInstance(userRepository);
