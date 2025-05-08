import { useStore } from "@nanostores/react";
import { GiRapidshareArrow } from "react-icons/gi";
import {
	$currentCountryAttempts,
	assignRandomCountry,
	type Guess,
} from "~/shared/store";

export default function ScoreDisplay() {
	const attempts = useStore($currentCountryAttempts);

	const attemptsPadded: (Guess | undefined)[] =
		attempts.length < 5
			? [...attempts, ...Array(5 - attempts.length).fill(undefined)]
			: attempts;

	const gradientTable = {
		pass: "from-[#C1E694] to-[#42A050]",
		fail: "from-[#E69494] to-[#A04242]",
		unattempted: "from-[#F8F8F8] to-[#E1E1E1]",
	};

	return (
		<div className="mb-12 flex items-start justify-between">
			<button
				className="relative flex cursor-pointer gap-2 rounded-full border border-gray-300 px-4 py-2 transition-all duration-150 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:bg-gray-50"
				onClick={assignRandomCountry}
				aria-label="Skip to the next country"
			>
				<GiRapidshareArrow size={24} />
				<span>Skip</span>
				<GiRapidshareArrow className="-scale-x-100" size={24} />
			</button>
			<div className="flex gap-1">
				{attemptsPadded.map((attempt, i) => {
					let gradientClass: string = "";
					if (attempt?.pass === true) {
						gradientClass = gradientTable.pass;
					} else if (attempt?.pass === false) {
						gradientClass = gradientTable.fail;
					} else {
						gradientClass = gradientTable.unattempted;
					}
					return (
						<div
							key={i}
							className={`grid place-items-center overflow-clip rounded-full bg-gradient-to-t p-[2px] ${gradientClass}`}
						>
							<div
								className={`h-4 w-4 rounded-full bg-gradient-to-b ${gradientClass}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
