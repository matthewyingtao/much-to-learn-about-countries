import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import {
	TransformComponent,
	TransformWrapper,
	useControls,
} from "react-zoom-pan-pinch";
import { mapPaths } from "~/data/countries";
import { $countriesCompleted, $currentCountry } from "~/shared/store";

const fillTable = {
	complete: "#C1E694",
	incomplete: "black",
	selected: "#AF94E6",
};

export default function MapDisplay() {
	const country = useStore($currentCountry);
	const completed = useStore($countriesCompleted);

	return (
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
				<svg
					fill="#ececec"
					stroke="black"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth=".3"
					version="1.2"
					viewBox="0 0 2000 857"
					className="h-full w-full"
					xmlns="http://www.w3.org/2000/svg"
				>
					{mapPaths.map(({ name, paths }) => {
						const isSelected = country === name;
						const isCompleted = completed.includes(name);

						const multiplePaths = paths.length > 1;

						let fillColor = fillTable.incomplete;
						if (isSelected) fillColor = fillTable.selected;
						if (isCompleted) fillColor = fillTable.complete;

						if (multiplePaths) {
							return (
								<g key={name} name={name} fill={fillColor} stroke="white">
									{paths.map((path) => (
										<path key={path} d={path} />
									))}
								</g>
							);
						}

						return (
							<path
								key={name}
								d={paths[0]}
								name={name}
								fill={fillColor}
								stroke="white"
							/>
						);
					})}
				</svg>
			</TransformComponent>
		</TransformWrapper>
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
