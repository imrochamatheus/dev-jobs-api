export interface User {
	id: string;
	email: string;
	admin?: boolean;
	password: string;
	last_name: string;
	first_name: string;

	created_at: Date;
}

export interface UserCreateRequest extends Omit<User, "id" | "created_at"> {}

export interface UserCreateResponse extends Pick<User, "id" | "email"> {
	name: string;
}

export interface UserResponse {
	id: string;
	email: string;
	admin: boolean;
	last_name: string;
	first_name: string;

	created_at: Date;
}
