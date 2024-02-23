import {Router} from "express";
import {companyController} from "../controllers/CompanyController";

const COMPANY_ROUTER = Router();

COMPANY_ROUTER.post(
	"/",
	companyController.createCompany.bind(companyController)
);

export {COMPANY_ROUTER};
