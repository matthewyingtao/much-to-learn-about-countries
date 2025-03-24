import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import Map from "~/components/map";
import { countries } from "~/data/countries";
import { randomChoice } from "~/shared/utils";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home(_: Route.ComponentProps) {
	const fetcher = useFetcher();

	const [country, setCountry] = useState(randomChoice(countries));

	useEffect(() => {
		const countryPaths = document.querySelectorAll(`[name="${country}"]`);
		console.log(countryPaths);
		countryPaths.forEach((path) => {
			path.setAttribute("fill", "red");
		});
	}, [country]);

	const [suggestion, setSuggestion] = useState("");

	return (
		<main className="grid grid-cols-[1fr_auto] h-screen">
			<Map highlightCountry="New Zealand" />
			<div className="max-w-[300px] w-full space-y-6 px-4">
				<h1>Much to Learn About Countries</h1>
				<fetcher.Form method="post" action="/submit">
					<h3>Current Country</h3>
					<span className="block">{country}</span>
					<input name="country" hidden value={country} />
					<input
						type="text"
						name="suggestion"
						value={suggestion}
						onChange={(e) => setSuggestion(e.target.value)}
					/>
					<button type="submit">Submit</button>
				</fetcher.Form>

				{fetcher.data && <div>{JSON.stringify(fetcher.data)}</div>}
			</div>
		</main>
	);
}
