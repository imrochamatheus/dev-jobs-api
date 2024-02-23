import {Router} from "express";
import {jobCreateBodySchema} from "../schemas/job.schema";
import {jobController} from "../controllers/JobController";
import {schemaValidate} from "../middlewares/schemaValidate.middleware";

const JOBS_ROUTER = Router();

JOBS_ROUTER.get("/", jobController.getAllJobs.bind(jobController));
JOBS_ROUTER.get("/:id", jobController.getJobById.bind(jobController));

JOBS_ROUTER.post(
	"/",
	[schemaValidate(jobCreateBodySchema)],
	jobController.createJob.bind(jobController)
);

export {JOBS_ROUTER};
