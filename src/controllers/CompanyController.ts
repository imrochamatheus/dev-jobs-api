import {Request} from "express";

import {ApiResponse} from "../models/interfaces/response.interfaces";
import {CompanyCreate} from "../models/interfaces/company.interfaces";
import {ICompanyService, companyService} from "../services/CompanyService";

export class CompanyController {
	private static _instance: CompanyController;

	private constructor(private readonly _companyService: ICompanyService) {}

	public async createCompany(
		req: Request<{}, {}, CompanyCreate>,
		res: ApiResponse<any>
	): Promise<void> {
		const company = await this._companyService.createCompany(req.body);

		if (company) {
			res.status(201).send({
				message: "Criado com sucesso!",
				data: company,
				success: true,
			});
		}
	}

	public static getInstance(
		companyService: ICompanyService
	): CompanyController {
		if (!CompanyController._instance) {
			CompanyController._instance = new CompanyController(companyService);
		}

		return CompanyController._instance;
	}
}

export const companyController: CompanyController =
	CompanyController.getInstance(companyService);
