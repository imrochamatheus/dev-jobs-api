import {prisma} from "../prisma";
import {Job, JobCreate, JobResponse} from "../models/interfaces/job.interfaces";
import {IUserRepository, userRepository} from "../repositories/userRepository";
import {IJobRepository, jobRepository} from "../repositories/jobRepository";
import {ApiError} from "../helpers/apiError";

export class JobService {
	private static _instance: JobService;
	// private _usersRepository: IUserRepository;

	private constructor(
		private readonly _usersRepository: IUserRepository,
		private readonly _jobRepository: IJobRepository
	) {}

	public static getInstance(
		_usersRepository: IUserRepository,
		_jobsRepository: IJobRepository
	): JobService {
		if (!JobService._instance) {
			JobService._instance = new JobService(_usersRepository, _jobsRepository);
		}

		return JobService._instance;
	}

	public async getAllJobs(): Promise<JobResponse[]> {
		return await this._jobRepository.getAllJobs();
	}

	public async createJob({
		reporter_id,
		...data
	}: JobCreate): Promise<JobResponse> {
		const reporter = await this._usersRepository.getUserById(reporter_id);

		if (!reporter) {
			throw new ApiError(404, "Usuário não encontrado");
		}

		if (!reporter.recruiter) {
			throw new ApiError(401, "Usuário não é um recrutador");
		}

		return await this._jobRepository.createJob({
			...data,
			reporter_id,
		});
	}
}

export const jobService: JobService = JobService.getInstance(
	userRepository,
	jobRepository
);
