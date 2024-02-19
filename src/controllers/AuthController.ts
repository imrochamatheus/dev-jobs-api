import {Request} from "express";

import {CustomResponse} from "../helpers/defaultResponse";
import {AuthRequest} from "../models/interfaces/auth.interfaces";
import {IAuthService, authService} from "../services/AuthService";

class AuthController {
	private static _instance: AuthController;

	private constructor(private readonly _authService: IAuthService) {}

	public async login(
		req: Request<{}, {}, AuthRequest>,
		res: CustomResponse<string | null>
	): Promise<void> {
		const {email, password} = req.body;

		const userToken = await this._authService.login(email, password);

		if (!userToken) {
			res.status(401).json({
				data: null,
				message: "Usuário ou senha inválidos!",
			});

			return;
		}

		res.status(200).json({
			message: "Login bem sucedido!",
			data: userToken,
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
