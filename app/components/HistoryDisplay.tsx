import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { $history } from "~/shared/store";

const getHistoryCardColor = (pass: boolean | null) => {
	if (pass === null) return "#d1d5dc";
	if (pass) return "#7bf1a8";
	return "#ffa2a2";
};

export default function HistoryDisplay() {
	const history = useStore($history);

	return (
		<div className="flex flex-col-reverse gap-y-4">
			{history.map(({ country, guesses }, index) => {
				// if there are no guesses, don't display the country
				if (guesses.length === 0) return null;
				return (
					<motion.div
						layout
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: "spring", bounce: 0, duration: 0.5 }}
						key={country}
					>
						<h3 className="-z-10 mb-2 translate-y-4 mask-b-from-0 text-5xl leading-[0.85] tracking-wide text-black/30 uppercase">
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
			<h3 className="text-2xl">History</h3>
		</div>
	);
}
