import {Request, Response, Router} from "express";

import {jobController} from "../controllers/JobController";

const JOBS_ROUTER = Router();

JOBS_ROUTER.get("/", (req: Request, res: Response) => {
	jobController.getAllJobs(req, res);
});

JOBS_ROUTER.post("/", (req: Request, res: Response) => {
	jobController.createJob(req, res);
});

export {JOBS_ROUTER};
