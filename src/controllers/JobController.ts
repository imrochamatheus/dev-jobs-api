import {Request, Response} from "express";
import {JobService, jobService} from "../services/JobService";
import {JobCreate} from "../models/interfaces/job.interfaces";

class JobController {
	private static _instance: JobController;
	private constructor(private readonly jobService: JobService) {}

	public static getInstance(): JobController {
		if (!JobController._instance) {
			JobController._instance = new JobController(jobService);
		}

		return JobController._instance;
	}

	public async getAllJobs(_: Request, res: Response): Promise<void> {
		try {
			const response = await this.jobService.getAllJobs();

			res.status(200).send(response);
		} catch (error) {
			res.status(500);
		}
	}

	public async createJob(
		req: Request<{}, JobCreate>,
		res: Response
	): Promise<void> {
		const {body} = req;

		try {
			const response = await this.jobService.createJob(body);

			res.status(201).send(response);
		} catch (error) {
			res.status(500);
		}
	}
}

export const jobController: JobController = JobController.getInstance();
