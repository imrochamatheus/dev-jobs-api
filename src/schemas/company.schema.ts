import * as z from "zod";

import {formatSchemaErrors} from "../helpers/formatSchemaErrors";

export const companySchema = z.object({
	name: z.string(formatSchemaErrors("name")),
	logo: z.string(formatSchemaErrors("logo")),
	website: z.string(formatSchemaErrors("website")),
});
