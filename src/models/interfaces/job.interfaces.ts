import {Job} from "@prisma/client";

export interface JobCreate {
	company: {
		name: string;
		logo: string;
		website: string;
	};
	position: string;
	contract: string;
	location: string;
	apply: string;
	description: string;
	requirements: {
		content: string;
		items: string[];
	};
	role: {
		content: string;
		items: string[];
	};
	reporter_id: string;
}

export interface JobResponse extends Omit<Job, "reporter_id"> {}

// export interface JobCreate extends Omit<Job, "id" | "created_at"> {}

export interface JobUpdateResponse extends Omit<Job, "reporter_id"> {}
