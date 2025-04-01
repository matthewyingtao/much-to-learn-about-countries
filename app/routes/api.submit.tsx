import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { systemPrompt } from "~/data/prompts";
import { db } from "~/shared/db";
import { CountryResponse } from "~/shared/zodTypes";
import type { Route } from "./+types/api.submit";

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();

	const country = formData.get("country") as string;
	const suggestion = (formData.get("suggestion") as string).toLowerCase();

	const trivia = await db.trivia.findFirst({
		where: {
			country: {
				name: country,
			},
			userSuggestion: suggestion,
		},
	});

	if (trivia) {
		return Response.json({
			country,
			suggestion,
			pass: trivia.pass,
			response: trivia.response,
		});
	}

	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const completion = await openai.beta.chat.completions.parse({
		model: "gpt-4o",
		messages: [
			{ role: "system", content: systemPrompt },
			{
				role: "user",
				content: `The country is '${country}' and the suggestion is '${suggestion}'`,
			},
		],
		text: {
			format: zodTextFormat(CountryResponse, "event"),
		},
	});

	const res = JSON.parse(completion.choices[0].message.content!);

	const parsedRes = CountryResponse.parse(res);

	const url = new URL("/api/save", request.url).toString();

	// save trivia to the database
	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			country,
			suggestion,
			pass: parsedRes.pass,
			response: parsedRes.response,
			secretKey: process.env.SECRET_KEY,
		}),
	}).catch(console.error);

	return Response.json({
		country,
		suggestion,
		...parsedRes,
	});
}
