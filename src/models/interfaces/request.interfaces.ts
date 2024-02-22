import {Request} from "express";
import {JwtPayload} from "jsonwebtoken";

export interface CustomRequest<
	P = any,
	B = any,
	Q = any,
	L extends Record<string, any> = Record<string, any>
> extends Request<P, B, Q, L> {
	decoded: JwtPayload;
}
