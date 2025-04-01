export default function ScoreDisplay({ attempts }: { attempts: boolean[] }) {
	const totalAttempts = attempts.length;
	const attemptsPadded: (boolean | undefined)[] =
		attempts.length < 5
			? [...attempts, ...Array(5 - attempts.length).fill(undefined)]
			: attempts;

	return (
		<div className="flex gap-1 mb-6">
			{attemptsPadded.map((attempt) => {
				const gradientTable = {
					pass: "from-[#C1E694] to-[#42A050]",
					fail: "from-[#E69494] to-[#A04242]",
					unattempted: "from-[#F8F8F8] to-[#E1E1E1]",
				};

				let gradientClass: string = "";

				if (attempt === true) {
					gradientClass = gradientTable.pass;
				} else if (attempt === false) {
					gradientClass = gradientTable.fail;
				} else {
					gradientClass = gradientTable.unattempted;
				}

				return (
					// TODO: figure out a sensible key
					<div
						className={`grid place-items-center bg-gradient-to-t p-[2px] rounded-full overflow-clip ${gradientClass}`}
					>
						<div
							className={`bg-gradient-to-b h-4 w-4 rounded-full ${gradientClass}`}
						/>
					</div>
				);
			})}
		</div>
	);
}
