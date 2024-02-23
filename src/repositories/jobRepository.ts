import {ApiError} from "../helpers/apiError";

import {Job} from "../schemas/job.schema";
import {JobResponse} from "../models/interfaces/job.interfaces";

import {ExtendedPrismaClient, prisma} from "../prisma";

import {roleItemRepository} from "./roleItemRepository";
import {requirementRepository} from "./requirementRepository";
import {IRoleRepository, roleRepository} from "./roleRepository";
import {requirementItemRepository} from "./requirementItemRepository";

export interface IJobRepository {
	getAllJobs(): Promise<JobResponse[]>;
	createJob(job: Job.Request.Create): Promise<any>;
	getJobById(id: number): Promise<JobResponse | null>;
}

export class JobRepository implements IJobRepository {
	private static _instance: JobRepository;

	private constructor(
		private readonly _prisma: ExtendedPrismaClient,
		private readonly _roleRepository: IRoleRepository
	) {}

	public async getAllJobs(): Promise<any[]> {
		return await this._prisma.job.findMany({
			select: {
				id: true,
				position: true,
				contract: true,
				location: true,
				apply: true,
				description: true,

				company: true,
				company_id: false,

				relator: true,
				relator_id: false,

				requirement_id: false,
				requirements: {
					include: {
						itens: true,
					},
				},

				role_id: false,
				role: {
					include: {
						itens: true,
					},
				},

				created_at: true,
			},
		});
	}

	public async createJob(
		data: Job.Request.Create
	): Promise<Job.Response.Create> {
		try {
			return await prisma.$transaction(async () => {
				const {id: roleId} = await this._roleRepository.createRole(data.role);

				const {id: requirementId} =
					await requirementRepository.createRequirement(data.requirements);

				await roleItemRepository.createManyRoleItem(
					data.role.itens.map((content) => ({
						id: roleId,
						content,
					}))
				);

				await requirementItemRepository.createManyRequirementItem(
					data.role.itens.map((content) => ({
						id: requirementId,
						content: content,
					}))
				);

				const {role, requirements, ...rest} = data;
				const createdJob = await this._prisma.job.create({
					data: {
						...rest,
						role_id: roleId,
						requirement_id: requirementId,
					},
					select: {
						id: true,
						apply: true,
						company: true,
						relator: true,
						contract: true,
						position: true,
						location: true,
						created_at: true,
						description: true,
						company_id: false,
						relator_id: false,
						requirement_id: false,
						requirements: {
							include: {
								itens: {
									select: {
										id: true,
										content: true,
									},
								},
							},
						},
						role_id: false,
						role: {
							include: {
								itens: {
									select: {
										id: true,
										content: true,
									},
								},
							},
						},
					},
				});

				return createdJob;
			});
		} catch (error) {
			await this._prisma.$executeRaw`ROLLBACK;`;

			console.log(error);
			throw new ApiError(400, "Erro ao criar vaga!");
		}
	}

	public async getJobById(id: number): Promise<JobResponse | null> {
		return await this._prisma.job.findFirst({
			where: {
				id,
			},
		});
	}

	public static getInstance(
		prismaClient: ExtendedPrismaClient,
		roleRepository: IRoleRepository
	): JobRepository {
		if (!JobRepository._instance) {
			JobRepository._instance = new JobRepository(prismaClient, roleRepository);
		}

		return JobRepository._instance;
	}
}

export const jobRepository = JobRepository.getInstance(prisma, roleRepository);
