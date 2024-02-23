import * as z from "zod";
import {formatSchemaErrors} from "../helpers/formatSchemaErrors";

export const requirementItemCreateReqSchema = z.string(
	formatSchemaErrors("item")
);
export const requirementItemSchema = z.object({
	id: z.number(),
	content: z.string(),
});

export namespace RequirementItem {
	export namespace Request {
		export type Create = z.infer<typeof requirementItemSchema>;
	}

	export namespace Response {
		export type Create = z.infer<typeof requirementItemSchema>;
	}
}
