import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import HistoryDisplay from "~/components/HistoryDisplay";
import IntroModal from "~/components/IntroModal";
import MapDisplay from "~/components/MapDisplay";
import ScoreDisplay from "~/components/ScoreDisplay";
import SuggestionForm from "~/components/SuggestionForm";
import { $history } from "~/shared/store";
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
		<main className="grid h-screen grid-cols-[1fr_55ch]">
			<MapDisplay />
			<div className="relative max-h-screen overflow-y-scroll border-l border-black px-8 py-4 text-[#616161]">
				<img
					src={pattern}
					alt=""
					className="pointer-events-none absolute top-0 left-0 -z-10 w-full"
				/>
				<h1 className="mb-6 w-[15ch] text-4xl">
					Much to Learn About Countries
				</h1>
				<IntroModal open={modal} closeCallback={() => setModal(false)} />
				<SuggestionForm fetcher={fetcher} />
				<ScoreDisplay attempts={attempts} />
				<h1 className="mb-6 w-[15ch] text-4xl">Score: {overallScore}</h1>
				<button onClick={skip}>skip</button>
				<HistoryDisplay history={history} />
			</div>
		</main>
	);
}
