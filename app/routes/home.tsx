import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";
import { systemPrompt } from "~/data/prompts";
import type { Route } from "./+types/home";

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

export async function loader({ params }: Route.LoaderArgs) {
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const completion = await openai.beta.chat.completions.parse({
		model: "gpt-4o",
		messages: [
			{ role: "system", content: systemPrompt },
			{
				role: "user",
				content: "The country is `New Zealand` and the suggestion is `Kiwi`",
			},
		],
		response_format: zodResponseFormat(countryResponse, "event"),
	});

	return completion;
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="max-w-[300px] w-full space-y-6 px-4">
				{loaderData.choices[0].message.content}
			</div>
		</main>
	);
}
