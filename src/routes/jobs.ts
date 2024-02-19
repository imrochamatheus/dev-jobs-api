import {Router} from "express";
import {jobController} from "../controllers/JobController";
import {schemaValidate} from "../middlewares/schemaValidate.middleware";

import {jobCreateSchema} from "../schemas/job.schemas";

const JOBS_ROUTER = Router();

JOBS_ROUTER.get("/", jobController.getAllJobs.bind(jobController));
JOBS_ROUTER.get("/:id", jobController.getJobById.bind(jobController));
JOBS_ROUTER.post(
	"/",
	[schemaValidate(jobCreateSchema)],
	jobController.createJob.bind(jobController)
);

export {JOBS_ROUTER};
