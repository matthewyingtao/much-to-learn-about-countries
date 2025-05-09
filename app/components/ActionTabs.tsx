import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { $countriesAvailable, $history } from "~/shared/store";

export default function ActionTabs() {
	const [tab, setTab] = useState<"history" | "remainingCountries">("history");

	return (
		<>
			<div className="mb-4 gap-x-4 whitespace-nowrap">
				<div className="grid grid-cols-[auto_auto] rounded-full border border-black/20">
					<button
						className="relative cursor-pointer rounded-full px-4 py-2"
						onClick={() => setTab("history")}
					>
						<AnimatePresence>
							{tab === "history" && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ type: "spring", bounce: 0, duration: 0.5 }}
									className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-gray-300"
								/>
							)}
						</AnimatePresence>
						<span className="relative z-10">History</span>
					</button>
					<button
						className="relative cursor-pointer rounded-full px-4 py-2"
						onClick={() => setTab("remainingCountries")}
					>
						<AnimatePresence>
							{tab === "remainingCountries" && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ type: "spring", bounce: 0, duration: 0.5 }}
									className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-gray-300"
								/>
							)}
						</AnimatePresence>
						<span className="relative z-10">Remaining Countries</span>
					</button>
				</div>
			</div>

			{tab === "history" && <HistoryDisplay />}
			{tab === "remainingCountries" && <RemainingCountries />}
		</>
	);
}
const getHistoryCardColor = (pass: boolean | null) => {
	if (pass === null) return "#d1d5dc";
	if (pass) return "#7bf1a8";
	return "#ffa2a2";
};

function HistoryDisplay() {
	const history = useStore($history);

	const hasGuesses = history.some(({ guesses }) => guesses.length > 0);

	if (!hasGuesses) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", bounce: 0, duration: 0.5 }}
				className="text-gray-500"
			>
				No guesses yet...
			</motion.div>
		);
	}

	return (
		<div className="-mt-4 flex flex-col-reverse gap-y-4">
			{history.map(({ country, guesses }, idx) => {
				// if there are no guesses, don't display the country
				if (guesses.length === 0) return null;

				return (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: "spring",
							bounce: 0,
							duration: 0.5,
							delay: (history.length - 1) * 0.1 - idx * 0.1,
						}}
						key={country}
					>
						<h3 className="-z-10 mb-2 translate-y-4 mask-b-from-0 text-5xl leading-[0.85] font-bold tracking-wide text-black/30 uppercase">
							{country}
						</h3>
						<div className="flex flex-col-reverse gap-y-2">
							{guesses.map(({ pass, response, suggestion }, i) => (
								<motion.div
									key={`${country}-${i}`}
									className="relative grid grid-cols-[15ch_1fr] items-center gap-6"
									initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
									animate={{
										opacity: 1,
										y: 0,
										filter: pass === null ? "blur(2px)" : "blur(0px)",
									}}
									transition={{
										type: "spring",
										bounce: 0,
										duration: 0.5,
										filter: {
											type: "tween",
											duration: 0.25,
											ease: "easeInOut",
										},
									}}
								>
									<div
										className="absolute top-0 -left-3 h-full w-1 rounded-full transition-all duration-150 ease-in-out"
										style={{
											backgroundColor: getHistoryCardColor(pass),
										}}
									/>
									<p className="w-[15ch] flex-1 wrap-break-word hyphens-auto">
										{suggestion}
									</p>
									<p>{response}</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}

function RemainingCountries() {
	const countries = useStore($countriesAvailable);

	return (
		<div className="grid grid-cols-3 gap-6">
			{countries.map((country, i) => {
				return (
					<motion.div
						key={country}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: "spring",
							bounce: 0,
							duration: 0.5,
							delay: i * 0.01,
						}}
						className="grid place-items-center rounded-md border border-gray-50 bg-gradient-to-b from-gray-100 to-white px-2 py-2 text-center text-balance"
					>
						<p>{country}</p>
					</motion.div>
				);
			})}
		</div>
	);
}
