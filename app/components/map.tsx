import { mapPaths } from "~/data/countries";

export default function Map({
	highlightCountry,
}: {
	highlightCountry: string;
}) {
	return (
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
					fill={highlightCountry === name ? "#AF94E6" : "black"}
					stroke={highlightCountry === name ? "#4254A0" : "white"}
				/>
			))}
		</svg>
	);
}
