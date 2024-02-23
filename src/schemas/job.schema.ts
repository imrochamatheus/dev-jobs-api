import * as z from "zod";

import {roleCreateReqSchema} from "./role.schema";
import {requirementCreateReqSchema} from "./requirement.schema";
import {formatSchemaErrors} from "../helpers/formatSchemaErrors";

export const jobSchema = z
	.object({
		id: z.number(),
		apply: z.string(formatSchemaErrors("apply")),
		position: z.string(formatSchemaErrors("position")),
		contract: z.string(formatSchemaErrors("contract")),
		location: z.string(formatSchemaErrors("location")),
		relator_id: z.string(formatSchemaErrors("relator_id")),
		description: z.string(formatSchemaErrors("description")),
		company_id: z.number(formatSchemaErrors("company_id", "number")),
		role: roleCreateReqSchema,
		requirements: requirementCreateReqSchema,
		created_at: z.date(),
	})
	.strict();

export const jobCreateReqSchema = jobSchema.omit({
	id: true,
	created_at: true,
});
export const jobUpdateReqSchema = jobCreateReqSchema.partial();

export const jobCreateBodySchema = z.object({
	body: jobCreateReqSchema,
});

const itensSchema = z.object({
	itens: z.array(
		z.object({
			id: z.number(),
			content: z.string(),
		})
	),
});

export const jobCreateResSchema = jobSchema
	.omit({
		relator_id: true,
		company_id: true,
		requirement_id: true,
	})
	.merge(
		z.object({
			role: itensSchema,
			requirements: itensSchema,
		})
	);

export namespace Job {
	export namespace Request {
		export type Create = z.infer<typeof jobCreateReqSchema>;
		export type Update = z.infer<typeof jobUpdateReqSchema>;
	}

	export namespace Response {
		export type Create = z.infer<typeof jobCreateResSchema>;
		export type Update = z.infer<typeof jobSchema>;
	}
}
