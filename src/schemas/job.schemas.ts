import * as z from "zod";

import {invalidTypeFormat} from "../helpers/invalidTypeFormat";

export const jobCreateSchema = z.object({
	body: z.object({
		title: z.string({
			required_error: "Campo obrigatório!",
			invalid_type_error: invalidTypeFormat("title", "string"),
		}),
		stack: z.string({
			required_error: "Campo obrigatório!",
			invalid_type_error: invalidTypeFormat("stack", "string"),
		}),
		company: z.string({
			required_error: "Campo obrigatório!",
			invalid_type_error: invalidTypeFormat("company", "string"),
		}),
		seniority: z.string({
			required_error: "Campo obrigatório!",
			invalid_type_error: invalidTypeFormat("seniority", "string"),
		}),
		description: z.string({
			required_error: "Campo obrigatório!",
			invalid_type_error: invalidTypeFormat("description", "string"),
		}),
		contract_type: z.string({
			required_error: "Campo obrigatório!",
			invalid_type_error: invalidTypeFormat("contract_type", "string"),
		}),
		location_type: z.string({
			required_error: "Campo obrigatório!",
			invalid_type_error: invalidTypeFormat("location_type", "string"),
		}),
		registration_link: z
			.string({
				required_error: "Campo obrigatório!",
			})
			.url({
				message: "Link de registro inválido!",
			}),
	}),
});

export const jobUpdateSchema = jobCreateSchema.partial();

export type JobCreateSchema = z.infer<typeof jobCreateSchema>;
export type JobUpdateSchema = z.infer<typeof jobUpdateSchema>;
