import {Router} from "express";
import {jobController} from "../controllers/JobController";

const JOBS_ROUTER = Router();

JOBS_ROUTER.get("/", jobController.getAllJobs.bind(jobController));
JOBS_ROUTER.post("/", jobController.createJob.bind(jobController));

export {JOBS_ROUTER};
