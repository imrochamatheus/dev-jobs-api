import * as z from "zod";

import {formatSchemaErrors} from "../helpers/formatSchemaErrors";
import {requirementItemCreateReqSchema} from "./requirementItem.schema";

export const requirementSchema = z.object({
	id: z.number(),
	content: z.string(formatSchemaErrors("content")),
	itens: z.array(requirementItemCreateReqSchema),
});

export const requirementCreateReqSchema = requirementSchema.omit({id: true});
export const requirementCreateResSchema = requirementSchema.omit({itens: true});

export namespace Requirement {
	export namespace Request {
		export type Create = z.infer<typeof requirementCreateReqSchema>;
	}

	export namespace Response {
		export type Create = z.infer<typeof requirementCreateResSchema>;
	}
}
