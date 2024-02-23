import {User} from "@prisma/client";

export interface UserCreateRequest extends Omit<User, "id" | "created_at"> {}
export interface UserResponse extends User {}
