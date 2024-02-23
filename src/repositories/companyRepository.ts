import {Company} from "@prisma/client";

import {ExtendedPrismaClient, prisma} from "../prisma";
import {CompanyCreate} from "../models/interfaces/company.interfaces";

export interface ICompanyRepository {
	createCompany: (data: CompanyCreate) => Promise<Company>;
	getCompanyById: (companyId: number) => Promise<Company | null>;
}

export class CompanyRepository implements ICompanyRepository {
	private static _instance: ICompanyRepository;

	private constructor(private readonly _prisma: ExtendedPrismaClient) {}

	public async createCompany(data: CompanyCreate): Promise<Company> {
		return await this._prisma.company.create({
			data,
		});
	}

	public async getCompanyById(companyId: number): Promise<Company | null> {
		return await this._prisma.company.findFirst({
			where: {
				id: companyId,
			},
		});
	}

	public static getInstance(
		prismaClient: ExtendedPrismaClient
	): ICompanyRepository {
		if (!CompanyRepository._instance) {
			CompanyRepository._instance = new CompanyRepository(prismaClient);
		}

		return CompanyRepository._instance;
	}
}

export const companyRepository: ICompanyRepository =
	CompanyRepository.getInstance(prisma);
