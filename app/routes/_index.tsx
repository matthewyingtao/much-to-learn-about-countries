import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import Map from "~/components/map";
import { countries } from "~/data/countries";
import { $currentCountry, $history } from "~/shared/store";
import { randomChoice } from "~/shared/utils";
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

	const country = useStore($currentCountry);
	const history = useStore($history);

	useEffect(() => {
		$currentCountry.set(randomChoice(countries));
	}, []);

	useEffect(() => {
		if (!fetcher.data) return;

		$history.set([...history, fetcher.data]);
	}, [fetcher.data]);

	return (
		<main className="grid grid-cols-[1fr_auto] h-screen">
			<Map highlightCountry="New Zealand" />
			<div className="max-w-[300px] w-full space-y-6 px-4">
				<h1>Much to Learn About Countries</h1>
				<fetcher.Form action="/api/submit" method="post">
					<h3>Current Country</h3>
					<span className="block">{country}</span>
					<input name="country" hidden value={country} readOnly />
					<input type="text" name="suggestion" />
					<button type="submit">Submit</button>
				</fetcher.Form>

				<h3>History</h3>
				{history.map(({ country, suggestion, pass, response }, index) => (
					<div key={index} className="space-y-2">
						<div>
							<span>Country:</span>
							<span>{country}</span>
						</div>
						<div>
							<span>Suggestion:</span>
							<span>{suggestion}</span>
						</div>
						<div>
							<span>Pass:</span>
							<span>{pass}</span>
						</div>
						<div>
							<span>Response:</span>
							<span>{response}</span>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
