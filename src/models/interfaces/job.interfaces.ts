import {UserResponse} from "./user.interfaces";

export interface Job {
	id: number;
	title: string;
	stack: string;
	company: string;
	banner: string | null;
	seniority: string;
	description: string;
	reporter_id: string;
	contract_type: string;
	location_type: string;
	registration_link: string;

	created_at?: Date;
}

export interface JobCreate extends Omit<Job, "id" | "created_at"> {}
export interface JobResponse extends Omit<Job, "reporter_id"> {
	reporter: {
		name: string;
		email: string;
		created_at: Date;
	};
}
