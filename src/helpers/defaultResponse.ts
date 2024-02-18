import {Response} from "express";

export interface CustomResponse<T>
	extends Response<{
		message: string;
		data: T;
	}> {}
