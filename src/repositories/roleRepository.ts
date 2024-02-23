import {ExtendedPrismaClient, prisma} from "../prisma";
import {Role} from "../schemas/role.schema";

export interface IRoleRepository {
	getAllRoles(): Promise<any>;
	getRoleById(id: number): Promise<any>;
	createRole(data: Role.Request.Create): Promise<Role.Response.Create>;
}

export class RoleRepository implements IRoleRepository {
	private static _instance: IRoleRepository;

	private constructor(private readonly _prisma: ExtendedPrismaClient) {}

	public getAllRoles(): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public getRoleById(id: number): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public async createRole(
		data: Role.Request.Create
	): Promise<Role.Response.Create> {
		return await this._prisma.role.create({
			data: {
				content: data.content,
			},
		});
	}

	public static getInstance(
		prismaInstance: ExtendedPrismaClient
	): IRoleRepository {
		if (!RoleRepository._instance) {
			RoleRepository._instance = new RoleRepository(prismaInstance);
		}

		return RoleRepository._instance;
	}
}

export const roleRepository: IRoleRepository =
	RoleRepository.getInstance(prisma);
