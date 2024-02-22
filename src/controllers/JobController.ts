import {Request} from "express";

import {ApiResponse} from "../models/interfaces/response.interfaces";
import {ApiRequest} from "../models/interfaces/request.interfaces";
import {JobCreate, JobResponse} from "../models/interfaces/job.interfaces";

import {ApiError} from "../helpers/apiError";
import {JobService, jobService} from "../services/JobService";

class JobController {
	private static _instance: JobController;
	private constructor(private readonly jobService: JobService) {}

	public async getAllJobs(
		_: Request,
		res: ApiResponse<JobResponse[]>
	): Promise<void> {
		const response = await this.jobService.getAllJobs();

		res.status(200).send({
			message: "Carregado com sucesso!",
			data: response,
			success: true,
		});
	}

	public extractJobData(req: Request): JobCreate {
		const {body, decoded} = req as ApiRequest<{}, {}, JobCreate>;

		return {
			...body,
			reporter_id: decoded.id,
		};
	}

	public async createJob(
		req: Request,
		res: ApiResponse<JobResponse>
	): Promise<void> {
		const jobData = this.extractJobData(req);
		console.log(jobData);

		const response = await this.jobService.createJob(jobData);

		if (!response) {
			throw new ApiError(500, "Erro ao criar vaga!");
		}

		res.status(201).send({
			message: "Criado com sucesso!",
			data: response,
			success: true,
		});
	}

	public async getJobById(
		{params}: Request<{id: number}>,
		res: ApiResponse<JobResponse>
	): Promise<void> {
		const {id} = params;

		const response = await this.jobService.getJobById(Number(id));

		res.status(200).send({
			success: true,
			message: "Carregado com sucesso!",
			data: response,
		});
	}

	public static getInstance(): JobController {
		if (!JobController._instance) {
			JobController._instance = new JobController(jobService);
		}

		return JobController._instance;
	}
}

export const jobController: JobController = JobController.getInstance();
