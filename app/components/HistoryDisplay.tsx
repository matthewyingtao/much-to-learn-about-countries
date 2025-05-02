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
		<motion.div className="flex flex-col-reverse gap-y-4">
			{history.map(({ country, guesses }, index) => {
				// if there are no guesses, don't display the country
				if (guesses.length === 0) return null;

				return (
					<div key={country}>
						<h3>{country}</h3>
						<div className="flex flex-col-reverse gap-y-2">
							{guesses.map(({ pass, response, suggestion }, i) => (
								<motion.div
									layout="position"
									key={index}
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
									<motion.div
										className="absolute top-0 -left-3 h-full w-1 rounded-full"
										animate={{
											backgroundColor: getHistoryCardColor(pass),
										}}
										transition={{
											type: "tween",
											duration: 0.25,
											ease: "easeInOut",
										}}
									/>
									<p className="w-[15ch] flex-1">{suggestion}</p>
									<p>{response}</p>
								</motion.div>
							))}
						</div>
					</div>
				);
			})}
			<h3 className="text-2xl">History</h3>
		</motion.div>
	);
}
