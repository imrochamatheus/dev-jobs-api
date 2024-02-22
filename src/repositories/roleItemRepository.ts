export interface IRoleItemRepository {
	getItensByRole(roleId: number): Promise<any>;
	createRoleItem(data: string): Promise<any>;
}

export class RoleItemRepository implements IRoleItemRepository {
	private static _instance: IRoleItemRepository;

	private constructor() {}
	public createRoleItem(data: string): Promise<any> {
		throw new Error("Method not implemented.");
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
