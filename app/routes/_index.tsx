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
import { $currentCountry } from "~/shared/store";
import usePrevious from "~/shared/utils";
import pattern from "../assets/dots.webp";
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
	return (
		<main className="grid h-screen md:grid-cols-[auto_minmax(min-content,55ch)]">
			<TransformWrapper
				velocityAnimation={{
					animationTime: 100,
				}}
				alignmentAnimation={{
					animationType: "easeInOutCubic",
					animationTime: 500,
				}}
				centerOnInit={true}
			>
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
					className="pointer-events-none absolute top-0 left-0 -z-10 w-full select-none"
				/>
				<h1 className="mb-6 w-[15ch] text-4xl leading-[0.95]">
					Much to Learn About Countries
				</h1>
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
	const prevCountry = usePrevious(country);

	const { zoomToElement } = useControls();

	useEffect(() => {
		if (!country) return;

		let zoomDuration = 1000;
		const speed = 50;

		const countryEl = document.querySelector(
			`[name="${country}"]`,
		) as HTMLElement;

		const countryRect = countryEl.getBoundingClientRect();

		const { width, height } = countryRect;

		const diagonal = Math.sqrt(width * width + height * height);

		const zoomScaling = Math.max(500 / diagonal, 2.5);

		if (prevCountry && prevCountry !== country) {
			console.log({
				prevCountry,
				country,
			});

			const prevCountryEl = document.querySelector(
				`[name="${prevCountry}"]`,
			) as HTMLElement;

			const prevCountryRect = prevCountryEl.getBoundingClientRect();

			const prevCountryCenterX =
				prevCountryRect.left + prevCountryRect.width / 2;

			const prevCountryCenterY =
				prevCountryRect.top + prevCountryRect.height / 2;

			const countryCenterX = countryRect.left + countryRect.width / 2;
			const countryCenterY = countryRect.top + countryRect.height / 2;

			const distanceX = countryCenterX - prevCountryCenterX;
			const distanceY = countryCenterY - prevCountryCenterY;

			const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

			zoomDuration = Math.max(distance / speed, 750);
		}

		zoomToElement(countryEl, zoomScaling, zoomDuration, "easeInOutCubic");
	}, [country]);

	return <></>;
}
