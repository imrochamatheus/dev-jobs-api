import {Job, JobCreate, JobResponse} from "../models/interfaces/job.interfaces";
import {prisma} from "../prisma";

export interface IJobRepository {
	getAllJobs(): Promise<JobResponse[]>;
	createJob(job: JobCreate): Promise<JobResponse>;
}

export class JobRepository implements IJobRepository {
	private static _instance: JobRepository;

	private constructor() {}
	public async getAllJobs(): Promise<JobResponse[]> {
		return await prisma.job.findMany({
			include: {
				reporter: {
					select: {
						name: true,
						email: true,
						created_at: true,
					},
				},
			},
		});
	}
	public async createJob(jobData: Job): Promise<JobResponse> {
		return await prisma.job.create({
			data: {
				...jobData,
			},
			include: {
				reporter: {
					select: {
						name: true,
						email: true,
						created_at: true,
					},
				},
			},
		});
	}

	public static getInstance(): JobRepository {
		if (!JobRepository._instance) {
			JobRepository._instance = new JobRepository();
		}

		return JobRepository._instance;
	}
}

export const jobRepository = JobRepository.getInstance();
