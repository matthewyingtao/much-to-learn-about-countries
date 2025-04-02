import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { useFetcher } from "react-router";
import { $currentCountry } from "~/shared/store";

export default function SuggestionForm({
	fetcher,
}: {
	fetcher: ReturnType<typeof useFetcher>;
}) {
	const [suggestion, setSuggestion] = useState("");

	const country = useStore($currentCountry);

	return (
		<fetcher.Form
			action="/api/submit"
			method="post"
			onSubmit={() => setSuggestion("")}
			className="mb-4"
		>
			<motion.h3 className="text-2xl">Current Country</motion.h3>
			<motion.span
				initial={{ opacity: 0, y: -8 }}
				animate={{ opacity: 1, y: 0 }}
				key={country}
				transition={{
					type: "spring",
					bounce: 0,
					duration: 0.5,
				}}
				className="block pb-4 text-4xl leading-[0.8]"
			>
				{country}
			</motion.span>
			{/* hidden form value */}
			<input name="country" hidden value={country} readOnly />
			<div className="overflow-hidden rounded-full bg-gradient-to-b from-gray-300 to-white p-1 shadow-md">
				<div className="flex overflow-hidden rounded-full bg-gradient-to-b from-white to-gray-300">
					<input
						type="text"
						name="suggestion"
						className="w-full p-2"
						value={suggestion}
						autoComplete="off"
						onChange={(e) => setSuggestion(e.target.value)}
					/>
					<button
						type="submit"
						disabled={suggestion.length === 0}
						className="starry-button-border cursor-pointer rounded-full p-1"
					>
						<div className="starry-button flex h-full items-center rounded-full px-8 py-2 text-sm leading-none text-white">
							Submit
						</div>
					</button>
				</div>
			</div>
		</fetcher.Form>
	);
}
