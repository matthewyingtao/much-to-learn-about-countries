import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import {
	TransformComponent,
	TransformWrapper,
	useControls,
} from "react-zoom-pan-pinch";
import ActionTabs from "~/components/ActionTabs";
import IntroModal from "~/components/IntroModal";
import MapDisplay from "~/components/MapDisplay";
import ScoreDisplay from "~/components/ScoreDisplay";
import SuggestionForm from "~/components/SuggestionForm";
import { $currentCountry, assignRandomCountry } from "~/shared/store";
import pattern from "../assets/dots.webp";
import Logo from "../assets/logo.png";
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

export default function Home() {
	useEffect(() => {
		assignRandomCountry();
	}, []);

	return (
		<main className="grid h-screen md:grid-cols-[auto_minmax(min-content,55ch)]">
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
			<aside className="relative max-h-screen overflow-y-scroll border-t border-[#140A29] px-4 py-4 text-[#241F2E] md:border-0 md:border-l md:px-8 md:py-8">
				<img
					src={pattern}
					alt=""
					className="pointer-events-none absolute top-0 left-0 -z-10 w-full"
				/>
				<img className="mb-6 max-w-[30ch]" src={Logo} alt="Logo" />
				<IntroModal />
				<SuggestionForm />
				<ScoreDisplay />
				<ActionTabs />
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
