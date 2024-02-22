export interface IRoleRepository {
	getAllRoles(): Promise<any>;
	getRoleById(id: number): Promise<any>;
	createRole(role: any): Promise<any>;
}

export class RoleRepository implements IRoleRepository {
	private static _instance: IRoleRepository;

	private constructor() {}

	public getAllRoles(): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public getRoleById(id: number): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public createRole(role: any): Promise<any> {
		throw new Error("Method not implemented.");
	}

	public static getInstance(): IRoleRepository {
		if (RoleRepository._instance) {
			RoleRepository._instance = new RoleRepository();
		}

		return RoleRepository._instance;
	}
}

export const roleRepository: IRoleRepository = RoleRepository.getInstance();
