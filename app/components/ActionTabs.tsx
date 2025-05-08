import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GiRapidshareArrow } from "react-icons/gi";
import {
	$countriesAvailable,
	$history,
	assignRandomCountry,
} from "~/shared/store";

export default function ActionTabs() {
	const [tab, setTab] = useState<"history" | "remainingCountries">("history");

	return (
		<div className="grid">
			<div className="mb-8 flex justify-between gap-x-4 whitespace-nowrap">
				<div className="flex rounded-full border border-black/20">
					<AnimatePresence>
						<button
							className="relative cursor-pointer rounded-full px-4 py-2"
							onClick={() => setTab("history")}
						>
							{tab === "history" && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ type: "spring", bounce: 0, duration: 0.5 }}
									className="absolute inset-0 rounded-full bg-gradient-to-b from-[#F9F9F9] to-[#E5E5E5]" // Or z-0
									layoutId="tab"
								/>
							)}
							<span className="relative z-10">History</span>
						</button>
						<button
							className="relative cursor-pointer rounded-full px-4 py-2"
							onClick={() => setTab("remainingCountries")}
						>
							{tab === "remainingCountries" && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ type: "spring", bounce: 0, duration: 0.5 }}
									className="absolute inset-0 rounded-full bg-gradient-to-b from-[#F9F9F9] to-[#E5E5E5]" // Or z-0
									layoutId="tab"
								/>
							)}
							<span className="relative z-10">Remaining Countries</span>
						</button>
					</AnimatePresence>
				</div>

				<button
					className="relative flex cursor-pointer gap-2 rounded-full border border-gray-300 px-4 py-2 transition-all duration-150 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:bg-gray-50"
					onClick={assignRandomCountry}
				>
					<GiRapidshareArrow size={24} />
					<span>Skip</span>
					<GiRapidshareArrow className="-scale-x-100" size={24} />
				</button>
			</div>

			{tab === "history" && <HistoryDisplay />}
			{tab === "remainingCountries" && <RemainingCountries />}
		</div>
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
			{history.map(({ country, guesses }) => {
				// if there are no guesses, don't display the country
				return (
					<motion.div
						layout
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: "spring", bounce: 0, duration: 0.5 }}
						key={country}
					>
						<h3 className="-z-10 mb-2 translate-y-4 mask-b-from-0 text-5xl leading-[0.85] font-bold tracking-wide text-black/30 uppercase">
							{country}
						</h3>
						<div className="flex flex-col-reverse gap-y-2">
							{guesses.map(({ pass, response, suggestion }, i) => (
								<motion.div
									layout
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
									<p className="w-[15ch] flex-1">{suggestion}</p>
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
