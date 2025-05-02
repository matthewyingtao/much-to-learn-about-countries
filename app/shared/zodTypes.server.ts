import { z } from "zod";

export const CountryResponse = z.object({
	pass: z.boolean(),
	response: z.string(),
});

export type CountryResponse = z.infer<typeof CountryResponse>;
