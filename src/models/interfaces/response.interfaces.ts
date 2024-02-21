import {Response} from "express";

export interface CustomResponse<T>
	extends Response<{
		success: boolean;
		message: string;
		token?: string;
		data?: T;
	}> {}
