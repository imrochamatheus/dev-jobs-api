import {Request} from "express";
import {JwtPayload} from "jsonwebtoken";

export interface ApiRequest<
	P = any,
	B = any,
	Q = qs.ParsedQs,
	L extends Record<string, any> = Record<string, any>
> extends Request<P, B, Q, L> {
	decoded: JwtPayload;
}
