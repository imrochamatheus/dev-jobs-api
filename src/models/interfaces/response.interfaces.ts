import {Response} from "express";

export interface ApiResponse<T>
	extends Response<{
		success: boolean;
		message: string;
		token?: string;
		data?: T;
	}> {}
