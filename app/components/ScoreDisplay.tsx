import { useStore } from "@nanostores/react";
import { $currentCountryAttempts, type Guess } from "~/shared/store";

export default function ScoreDisplay() {
	const attempts = useStore($currentCountryAttempts);

	const attemptsPadded: (Guess | undefined)[] =
		attempts.length < 5
			? [...attempts, ...Array(5 - attempts.length).fill(undefined)]
			: attempts;

	return (
		<div className="mb-12 flex gap-1">
			{attemptsPadded.map((attempt, i) => {
				const gradientTable = {
					pass: "from-[#C1E694] to-[#42A050]",
					fail: "from-[#E69494] to-[#A04242]",
					unattempted: "from-[#F8F8F8] to-[#E1E1E1]",
				};
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
	);
}
