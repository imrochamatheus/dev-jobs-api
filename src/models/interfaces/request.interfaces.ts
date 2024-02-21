import {Request} from "express";
import {JwtPayload} from "jsonwebtoken";

export interface CustomRequest<P = {}, B = {}, Q = {}, L = Record<string, any>>
	extends Request<P, B, Q, L> {
	decoded: JwtPayload;
}
