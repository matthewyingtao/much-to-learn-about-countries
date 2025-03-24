import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import Map from "~/components/map";
import { countries } from "~/data/countries";
import { $currentCountry, $history } from "~/shared/store";
import { randomChoice } from "~/shared/utils";
import pattern from "../assets/dots.png";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Much to Learn About Countries" },
		{
			name: "description",
			content:
				"How much do you know about the countries around the world? Play this game and find out!",
		},
	];
}

export default function Home(_: Route.ComponentProps) {
	const fetcher = useFetcher();
	const [suggestion, setSuggestion] = useState("");

	const country = useStore($currentCountry);
	const history = useStore($history);

	console.log(history);

	useEffect(() => {
		$currentCountry.set(randomChoice(countries));
	}, []);

	useEffect(() => {
		if (!fetcher.data) return;

		$history.set([...history, fetcher.data]);
	}, [fetcher.data]);

	return (
		<main className="grid grid-cols-[1fr_55ch] h-screen">
			<Map highlightCountry={country} />
			<div className="relative space-y-6 px-8 py-4 border-l border-black text-[#616161]">
				<img
					src={pattern}
					alt=""
					className="absolute top-0 left-0 w-full -z-10 pointer-events-none"
				/>
				<h1 className="text-4xl w-[15ch]">Much to Learn About Countries</h1>
				<fetcher.Form action="/api/submit" method="post">
					<h3 className="text-2xl">Current Country</h3>
					<span className="block text-4xl leading-[0.8] pb-4">{country}</span>
					{/* hidden form value */}
					<input name="country" hidden value={country} readOnly />
					<div className="rounded-full overflow-hidden">
						<div className="flex border border-black rounded-full overflow-hidden bg-gradient-to-b from-white to-gray-300">
							<input
								type="text"
								name="suggestion"
								className="w-full p-2"
								value={suggestion}
								onChange={(e) => setSuggestion(e.target.value)}
							/>
							<button
								type="submit"
								disabled={suggestion.length === 0}
								className="px-6 border border-black rounded-full"
							>
								Submit
							</button>
						</div>
					</div>
				</fetcher.Form>

				<h3 className="text-2xl">History</h3>
				<div className="flex flex-col space-y-4">
					{history.map(({ country, suggestion, pass, response }, index) => (
						<div key={index} className="flex relative gap-5 items-center">
							<div
								className={`absolute -left-2 top-0 h-full w-1 rounded-full ${
									pass ? "bg-green-300" : "bg-red-300"
								}`}
							/>
							<p className="w-[15ch]">{country}</p>
							<div>
								<p>{response}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
