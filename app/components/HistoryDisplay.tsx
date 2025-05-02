import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { $history } from "~/shared/store";

export default function HistoryDisplay() {
	const history = useStore($history);

	return (
		<motion.div className="flex flex-col-reverse gap-y-4">
			{history.map(({ country, suggestion, pass, response }, index) => (
				<motion.div
					layout
					key={index}
					className="relative grid grid-cols-[15ch_1fr] items-center gap-6"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						type: "spring",
						bounce: 0,
						duration: 0.5,
					}}
				>
					<div
						className={`absolute top-0 -left-3 h-full w-1 rounded-full ${
							pass ? "bg-green-300" : "bg-red-300"
						}`}
					/>
					<p className="w-[15ch] flex-1">{country}</p>
					<p>{response}</p>
				</motion.div>
			))}
			<h3 className="text-2xl">History</h3>
		</motion.div>
	);
}
