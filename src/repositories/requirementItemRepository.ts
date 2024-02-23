import {GetBatchResult} from "@prisma/client/runtime/library";
import {RequirementItem} from "../schemas/requirementItem.schema";
import {prisma} from "../prisma";

export interface IRequirementItemRepository {
	getAllRequirementItems(): Promise<any>;
	getRequirementItemById(id: number): Promise<any>;
	createRequirementItem(requirementItem: any): Promise<any>;
	createManyRequirementItem(requirementItem: any): Promise<any>;
}

export class RequirementItemRepository implements IRequirementItemRepository {
	private static _instance: IRequirementItemRepository;

	private constructor() {}

	public getAllRequirementItems(): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public getRequirementItemById(id: number): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public createRequirementItem(requirementItem: any): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public async createManyRequirementItem(
		data: RequirementItem.Request.Create[]
	): Promise<GetBatchResult> {
		return await prisma.requirementItem.createMany({
			data: data.map((item) => {
				return {
					content: item.content,
					requirement_id: item.id,
				};
			}),
		});
	}

	public static getInstance(): IRequirementItemRepository {
		if (!RequirementItemRepository._instance) {
			RequirementItemRepository._instance = new RequirementItemRepository();
		}

		return RequirementItemRepository._instance;
	}
}

export const requirementItemRepository: IRequirementItemRepository =
	RequirementItemRepository.getInstance();
