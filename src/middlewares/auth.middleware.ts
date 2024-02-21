import {NextFunction, Request, Response} from "express";
import {JsonWebTokenError, verify} from "jsonwebtoken";

import {ApiError} from "../helpers/apiError";
import {CustomRequest} from "../models/interfaces/request.interfaces";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			throw new JsonWebTokenError("Token não fornecido!");
		}

		const [bearer, hash] = token.split(" ");

		if (bearer !== "Bearer" || !hash) {
			throw new JsonWebTokenError("Token inválido!");
		}

		const decodedToken = verify(hash, process.env.JWT_SECRET as string);

		if (typeof decodedToken === "string") {
			throw new JsonWebTokenError("Token inválido!");
		}

		const customRequest = req as CustomRequest;
		customRequest.decoded = decodedToken;

		next();
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			next(new ApiError(401, error.message));
		} else {
			next(error);
		}
	}
};
