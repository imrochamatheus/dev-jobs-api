import * as z from "zod";
import {formatSchemaErrors} from "../helpers/formatSchemaErrors";

const roleItemSchema = z.string(formatSchemaErrors("item"));

export const roleSchema = z.object({
	id: z.number(),
	itens: z.array(roleItemSchema),
	content: z.string(z.string(formatSchemaErrors("content"))),
});

export const roleCreateReqSchema = roleSchema.omit({id: true});
export const roleCreateResSchema = roleSchema.omit({itens: true});

export namespace Role {
	export namespace Request {
		export type Create = z.infer<typeof roleCreateReqSchema>;
	}
	export namespace Response {
		export type Create = z.infer<typeof roleCreateResSchema>;
	}
}
