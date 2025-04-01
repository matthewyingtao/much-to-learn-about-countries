import { db } from "~/shared/db";
import type { Route } from "./+types/api.save";

export async function action({ request }: Route.ActionArgs) {
	const { country, suggestion, pass, response, secretKey } =
		await request.json();

	const countryRecord = await db.country.findFirst({
		where: { name: country },
	});

	if (!countryRecord) {
		return Response.json(
			{ success: false, error: "Country not found" },
			{ status: 400 }
		);
	}

	await db.trivia.create({
		data: {
			countryId: countryRecord.id,
			userSuggestion: suggestion,
			pass,
			response,
		},
	});

	return Response.json({ success: true });
}
