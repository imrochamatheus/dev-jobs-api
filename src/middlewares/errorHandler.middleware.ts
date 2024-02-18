import {NextFunction, Request, Response} from "express";
import {ApiError} from "../helpers/apiError";

export const errorHandlerMiddleware = (
	error: Error & ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof ApiError) {
		return res
			.status(error.status)
			.json({message: error.message, success: false});
	}

	return res
		.status(500)
		.json({message: "Internal server error!", success: false});
};
