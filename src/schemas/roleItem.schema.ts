import * as z from "zod";
import {formatSchemaErrors} from "../helpers/formatSchemaErrors";

export const roletItemCreateReqSchema = z.string(formatSchemaErrors("item"));
export const roletItemSchema = z.object({
	id: z.number(),
	content: z.string(),
});

export namespace RoleItem {
	export namespace Request {
		export type Create = z.infer<typeof roletItemSchema>;
	}

	export namespace Response {
		export type Create = z.infer<typeof roletItemSchema>;
	}
}
