import {ApiError} from "../helpers/apiError";
import {JobResponse} from "../models/interfaces/job.interfaces";

import {
	ICompanyRepository,
	companyRepository,
} from "../repositories/companyRepository";
import {IJobRepository, jobRepository} from "../repositories/jobRepository";
import {IUserRepository, userRepository} from "../repositories/userRepository";
import {Job} from "../schemas/job.schema";

export class JobService {
	private static _instance: JobService;

	private constructor(
		private readonly _usersRepository: IUserRepository,
		private readonly _jobRepository: IJobRepository,
		private readonly _companyRepository: ICompanyRepository
	) {}

	private async validateReporter(relatorId: string): Promise<void> {
		const reporter = await this._usersRepository.getUserById(relatorId);

		if (!reporter) {
			throw new ApiError(404, "Usuário não encontrado!");
		}

		if (!reporter.recruiter) {
			throw new ApiError(401, "Usuário não é um recrutador!");
		}
	}

	private async validateCompany(companyId: number): Promise<void> {
		const company = await this._companyRepository.getCompanyById(companyId);

		if (!company) {
			throw new ApiError(404, "Não há empresa associada ao ID fornecido!");
		}
	}

	public async getAllJobs(): Promise<JobResponse[]> {
		return await this._jobRepository.getAllJobs();
	}

	public async getJobById(id: number): Promise<JobResponse> {
		const searchedJob: JobResponse | null =
			await this._jobRepository.getJobById(id);

		if (!searchedJob) {
			throw new ApiError(404, "A vaga solicitada não foi encontrada!");
		}

		return searchedJob;
	}

	public async createJob(data: Job.Request.Create): Promise<any> {
		await this.validateReporter(data.relator_id);
		await this.validateCompany(data.company_id);

		return await this._jobRepository.createJob({
			...data,
		});
	}

	public static getInstance(
		usersRepository: IUserRepository,
		jobsRepository: IJobRepository,
		companyRepository: ICompanyRepository
	): JobService {
		if (!JobService._instance) {
			JobService._instance = new JobService(
				usersRepository,
				jobsRepository,
				companyRepository
			);
		}

		return JobService._instance;
	}
}

export const jobService: JobService = JobService.getInstance(
	userRepository,
	jobRepository,
	companyRepository
);
