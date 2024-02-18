export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	recruiter?: boolean;

	created_at: Date;
}

export interface UserCreateRequest extends Omit<User, "id" | "created_at"> {}

export interface UserCreateResponse
	extends Pick<User, "id" | "email" | "name"> {}

export interface UserResponse extends Omit<User, "password"> {}
