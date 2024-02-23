import {Company} from "@prisma/client";

import {
	ICompanyRepository,
	companyRepository,
} from "../repositories/companyRepository";
import {ApiError} from "../helpers/apiError";
import {CompanyCreate} from "../models/interfaces/company.interfaces";

export interface ICompanyService {
	createCompany(data: CompanyCreate): Promise<Company | void>;
}

class CompanyService implements ICompanyService {
	private static _instance: ICompanyService;

	private constructor(
		private readonly _companyRepository: ICompanyRepository
	) {}

	public async createCompany(data: CompanyCreate): Promise<Company | void> {
		const company: Company | null = await this._companyRepository.createCompany(
			data
		);

		if (!company) {
			throw new ApiError(401, "Erro ao adicionar empresa parceira!");
		}

		return company;
	}

	public static getInstance(
		companyRepository: ICompanyRepository
	): ICompanyService {
		if (!CompanyService._instance) {
			CompanyService._instance = new CompanyService(companyRepository);
		}

		return CompanyService._instance;
	}
}

export const companyService: ICompanyService =
	CompanyService.getInstance(companyRepository);
