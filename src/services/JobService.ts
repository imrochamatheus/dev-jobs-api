import {prisma} from "../prisma";
import {userService} from "./UserService";
import {Job, JobCreate, JobResponse} from "../models/interfaces/job.interfaces";

export class JobService {
	private static _instance: JobService;

	private constructor() {}

	public static getInstance(): JobService {
		if (!JobService._instance) {
			JobService._instance = new JobService();
		}

		return JobService._instance;
	}

	public async getAllJobs(): Promise<JobResponse[]> {
		const response = await prisma.job.findMany({
			include: {
				reporter: {
					select: {
						id: true,
						email: true,
						admin: true,
						last_name: true,
						first_name: true,
						created_at: true,
					},
				},
			},
		});

		return response;
	}

	public async createJob({reporter_id, ...data}: JobCreate): Promise<unknown> {
		const reporter = await userService.getUserById(reporter_id);

		if (!reporter) {
			return "Usuário não encontrado";
		}

		const response: Job = await prisma.job.create({
			data: {
				...data,
				reporter_id,
			},
		});

		return response;
	}
}

export const jobService: JobService = JobService.getInstance();
