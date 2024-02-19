import {User} from "@prisma/client";

export interface UserCreateRequest extends Omit<User, "id" | "created_at"> {}

export interface UserCreateResponse
	extends Pick<User, "id" | "email" | "name"> {}

export interface UserResponse extends Omit<User, "password"> {}
