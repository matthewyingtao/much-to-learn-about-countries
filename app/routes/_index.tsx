import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import {
	TransformComponent,
	TransformWrapper,
	useControls,
} from "react-zoom-pan-pinch";
import HistoryDisplay from "~/components/HistoryDisplay";
import IntroModal from "~/components/IntroModal";
import MapDisplay from "~/components/MapDisplay";
import ScoreDisplay from "~/components/ScoreDisplay";
import SuggestionForm from "~/components/SuggestionForm";
import { db } from "~/shared/db";
import { $currentCountry, $history } from "~/shared/store";
import { assignRandomCountry } from "~/shared/utils";
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

export async function loader(_: Route.LoaderArgs) {
	// make a request to the DB to warm it up before the user starts playing
	const firstCountry = db.country.findFirstOrThrow();

	if (!firstCountry) {
		throw new Response("No countries found", { status: 404 });
	}
}

export default function Home(_: Route.ComponentProps) {
	const fetcher = useFetcher();

	const history = useStore($history);

	const [overallScore, setOverallScore] = useState(0);
	const [attempts, setAttempts] = useState<boolean[]>([]);

	const totalAttempts = attempts.length;
	const currentScore = attempts.filter((item) => item).length;

	const [modal, setModal] = useState(true);

	useEffect(() => {
		assignRandomCountry();
	}, []);

	useEffect(() => {
		if (!fetcher.data) return;

		$history.set([...history, fetcher.data]);

		setAttempts((prev) => [...prev, fetcher.data.pass]);

		// since the value doesn't update until after the render, we need to evaluate the current value
		if (fetcher.data.pass && currentScore >= 2) {
			assignRandomCountry();
			setOverallScore((prev) => prev + 1);
			setAttempts([]);
		}

		if (totalAttempts >= 4) {
			assignRandomCountry();
			setOverallScore(0);
			setAttempts([]);
		}
	}, [fetcher.data]);

	function skip() {
		setAttempts([]);
		assignRandomCountry();
	}

	return (
		<main className="grid h-screen md:grid-cols-[auto_minmax(min-content,55ch)]">
			<div className="h-full w-full">
				<TransformWrapper centerOnInit={true}>
					<TransformComponent
						wrapperStyle={{
							height: "100%",
							width: "100%",
						}}
						contentStyle={{
							height: "100%",
							width: "100%",
						}}
					>
						<MapController />
						<MapDisplay />
					</TransformComponent>
				</TransformWrapper>
			</div>
			<aside className="relative max-h-screen overflow-y-scroll border-t border-[#140A29] px-4 py-4 text-[#241F2E] md:border-0 md:border-l md:px-8 md:py-8">
				<img
					src={pattern}
					alt=""
					className="pointer-events-none absolute top-0 left-0 -z-10 w-full"
				/>
				<h1 className="mb-6 max-w-[15ch] text-4xl">
					Much to Learn About Countries
				</h1>
				<IntroModal open={modal} closeCallback={() => setModal(false)} />
				<SuggestionForm fetcher={fetcher} />
				<ScoreDisplay attempts={attempts} />
				<h1 className="mb-6 max-w-[15ch] text-4xl">Score: {overallScore}</h1>
				<button onClick={skip}>skip</button>
				<HistoryDisplay history={history} />
			</aside>
		</main>
	);
}

// This component has no UI. Ideally the logic should be in the Map component, but
// it needs to be a child of TransformWrapper to get the zoomToElement function.
function MapController() {
	const country = useStore($currentCountry);
	const { zoomToElement } = useControls();

	useEffect(() => {
		if (!country) return;

		const countryEl = document.querySelector(
			`[name="${country}"]`,
		) as HTMLElement;

		zoomToElement(countryEl, 2.5, 1000, "easeInOutCubic");
	});

	return <></>;
}
