import {Request} from "express";

import {AuthRequest} from "../models/interfaces/auth.interfaces";
import {IAuthService, authService} from "../services/AuthService";
import {ApiResponse} from "../models/interfaces/response.interfaces";

class AuthController {
	private static _instance: AuthController;

	private constructor(private readonly _authService: IAuthService) {}

	public async login(
		req: Request<{}, {}, AuthRequest>,
		res: ApiResponse<string | null>
	): Promise<void> {
		const {email, password} = req.body;

		const userToken = await this._authService.login(email, password);

		if (!userToken) {
			res.status(401).json({
				message: "Usuário ou senha inválidos!",
				success: false,
			});

			return;
		}

		res.status(200).json({
			message: "Login bem sucedido!",
			token: userToken,
			success: true,
		});
	}

	public static getInstance(authService: IAuthService): AuthController {
		if (!AuthController._instance) {
			AuthController._instance = new AuthController(authService);
		}

		return AuthController._instance;
	}
}

export const authController: AuthController =
	AuthController.getInstance(authService);
