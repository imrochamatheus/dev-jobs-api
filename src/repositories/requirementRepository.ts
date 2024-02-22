export interface IRequirementRepository {
	getAllRequirements(): Promise<any>;
	getRequirementById(id: number): Promise<any>;
	createRequirement(requirement: any): Promise<any>;
}

export class RequirementRepository implements IRequirementRepository {
	private static _instance: IRequirementRepository;

	private constructor() {}
	public getAllRequirements(): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public getRequirementById(id: number): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public createRequirement(requirement: any): Promise<any> {
		throw new Error("Method not implemented.");
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
