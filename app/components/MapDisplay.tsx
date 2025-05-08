import { useStore } from "@nanostores/react";
import { mapPaths } from "~/data/countries";
import { $countriesCompleted, $currentCountry } from "~/shared/store";

const fillTable = {
	complete: "#C1E694",
	incomplete: "#140A29",
	selected: "#AF94E6",
};

export default function MapDisplay() {
	const country = useStore($currentCountry);
	const completed = useStore($countriesCompleted);

	return (
		<svg
			fill="#ececec"
			stroke="#140A29"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth=".3"
			version="1.2"
			viewBox="0 0 2000 857"
			className="h-full w-full cursor-grab drop-shadow active:cursor-grabbing"
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
	);
}
