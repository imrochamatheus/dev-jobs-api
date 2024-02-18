import {Request} from "express";
import {CustomResponse} from "../helpers/defaultResponse";
import {JobService, jobService} from "../services/JobService";
import {JobCreate, JobResponse} from "../models/interfaces/job.interfaces";

class JobController {
	private static _instance: JobController;
	private constructor(private readonly jobService: JobService) {}

	public async getAllJobs(
		_: Request,
		res: CustomResponse<JobResponse[]>
	): Promise<void> {
		const response = await this.jobService.getAllJobs();

		res.status(200).send({
			message: "Carregado com sucesso!",
			data: response,
		});
	}

	public async createJob(
		req: Request<{}, {}, JobCreate>,
		res: CustomResponse<JobResponse>
	): Promise<void> {
		const {body} = req;
		const response = await this.jobService.createJob(body);

		res.status(201).send({
			message: "Criado com sucesso!",
			data: response,
		});
	}

	public async getJobById(
		{params}: Request<{id: number}>,
		res: CustomResponse<JobResponse>
	): Promise<void> {
		const {id} = params;

		const response = await this.jobService.getJobById(Number(id));

		res.status(200).send({
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
