import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import {
	TransformComponent,
	TransformWrapper,
	useControls,
} from "react-zoom-pan-pinch";
import { mapPaths } from "~/data/countries";
import { $currentCountry } from "~/shared/store";

export default function Map() {
	const country = useStore($currentCountry);

	return (
		<TransformWrapper centerOnInit={true} smooth={false}>
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
					{mapPaths.map(({ path, name }) => (
						<path
							key={path}
							d={path}
							name={name}
							fill={country === name ? "#AF94E6" : "black"}
							stroke={country === name ? "#4254A0" : "white"}
						/>
					))}
				</svg>
			</TransformComponent>
		</TransformWrapper>
	);
}

function MapController() {
	const country = useStore($currentCountry);
	const { zoomToElement } = useControls();

	useEffect(() => {
		if (!country) return;

		const countryEl = document.querySelector(
			`[name="${country}"]`
		) as HTMLElement;
		if (countryEl) {
			zoomToElement(countryEl, 2.5);
		}
	});

	return <></>;
}
