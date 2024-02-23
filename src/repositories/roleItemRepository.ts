import {GetBatchResult} from "@prisma/client/runtime/library";
import {prisma} from "../prisma";
import {RoleItem} from "../schemas/roleItem.schema";

export interface IRoleItemRepository {
	getItensByRole(roleId: number): Promise<any>;
	createRoleItem(
		data: RoleItem.Request.Create
	): Promise<RoleItem.Response.Create>;
	createManyRoleItem(data: RoleItem.Request.Create[]): Promise<GetBatchResult>;
}

export class RoleItemRepository implements IRoleItemRepository {
	private static _instance: IRoleItemRepository;

	private constructor() {}
	public async createRoleItem(
		data: RoleItem.Request.Create
	): Promise<RoleItem.Response.Create> {
		return await prisma.roleItem.create({
			data: {
				content: data.content,
				role_id: data.id,
			},
		});
	}

	public async createManyRoleItem(
		data: RoleItem.Request.Create[]
	): Promise<GetBatchResult> {
		return await prisma.roleItem.createMany({
			data: data.map((item) => {
				return {
					content: item.content,
					role_id: item.id,
				};
			}),
		});
	}

	public getItensByRole(): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public static getInstance(): IRoleItemRepository {
		if (!RoleItemRepository._instance) {
			RoleItemRepository._instance = new RoleItemRepository();
		}

		return RoleItemRepository._instance;
	}
}

export const roleItemRepository: IRoleItemRepository =
	RoleItemRepository.getInstance();
