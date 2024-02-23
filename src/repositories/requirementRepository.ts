import {prisma} from "../prisma";
import {Requirement} from "../schemas/requirement.schema";

export interface IRequirementRepository {
	getAllRequirements(): Promise<any>;
	getRequirementById(id: number): Promise<any>;
	createRequirement(
		requirement: Requirement.Request.Create
	): Promise<Requirement.Response.Create>;
}

export class RequirementRepository implements IRequirementRepository {
	private static _instance: IRequirementRepository;

	private constructor() {}
	public async getAllRequirements(): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public async getRequirementById(id: number): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public async createRequirement(
		data: Requirement.Request.Create
	): Promise<Requirement.Response.Create> {
		return await prisma.requirement.create({
			data: {
				content: data.content,
			},
		});
	}

	public static getInstance(): IRequirementRepository {
		if (!RequirementRepository._instance) {
			RequirementRepository._instance = new RequirementRepository();
		}

		return RequirementRepository._instance;
	}
}

export const requirementRepository: IRequirementRepository =
	RequirementRepository.getInstance();
