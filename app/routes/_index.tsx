import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { useState } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { systemPrompt } from "~/data/prompts";
import { db } from "~/shared/db";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

const countryResponse = z.object({
	pass: z.boolean(),
	response: z.string(),
});

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
		console.log("Found trivia in database");

		return Response.json({
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
		response_format: zodResponseFormat(countryResponse, "event"),
	});

	const res = JSON.parse(completion.choices[0].message.content!);

	const parsedRes = countryResponse.parse(res);

	const countryObj = await db.country.findFirst({
		where: {
			name: country,
		},
	});

	const newTrivia = await db.trivia.create({
		data: {
			countryId: countryObj?.id!,
			userSuggestion: suggestion,
			pass: parsedRes.pass,
			response: parsedRes.response,
		},
	});

	return Response.json({
		...parsedRes,
	});
}

export default function Home({ actionData }: Route.ComponentProps) {
	const [country, setCountry] = useState("");

	console.log({ actionData });

	return (
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="max-w-[300px] w-full space-y-6 px-4">
				<Form method="post">
					<input type="text" name="country" defaultValue={"New Zealand"} />
					<input type="text" name="suggestion" />
					<button type="submit">"submit"</button>
				</Form>
			</div>
		</main>
	);
}
