import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { href, useFetcher } from "react-router";
import {
	$currentCountry,
	submitGuess,
	updateGuessResponse,
} from "~/shared/store";
import type { CountryResponse } from "~/shared/zodTypes.server";

export default function SuggestionForm() {
	const fetcher = useFetcher<CountryResponse>();

	useEffect(() => {
		if (!fetcher.data) return;
		updateGuessResponse(fetcher.data);
	}, [fetcher.data]);

	const [suggestion, setSuggestion] = useState("");

	const country = useStore($currentCountry);

	return (
		<fetcher.Form
			action={href("/api/submit")}
			method="post"
			onSubmit={() => {
				submitGuess(suggestion);
				setSuggestion("");
			}}
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
						className="w-full rounded-full p-2 outline-current"
						value={suggestion}
						autoComplete="off"
						onChange={(e) => setSuggestion(e.target.value)}
						required
					/>
					<motion.button
						type="submit"
						disabled={fetcher.state !== "idle"}
						className="starry-button-border group cursor-pointer rounded-full p-1 transition-all duration-[250ms] ease-in-out disabled:cursor-not-allowed disabled:brightness-[0.8] disabled:saturate-[0.8]"
					>
						<div className="starry-button relative flex h-full items-center rounded-full px-8 py-2 text-sm leading-none text-white transition-all duration-75 ease-in-out group-hover:inset-shadow-sm">
							<motion.p
								animate={{
									opacity: fetcher.state === "idle" ? 1 : 0,
									y: fetcher.state === "idle" ? 0 : 4,
								}}
								transition={{
									type: "tween",
									duration: 0.25,
									ease: "easeInOut",
								}}
							>
								Submit
							</motion.p>
							<motion.div
								animate={{
									opacity: fetcher.state === "submitting" ? 1 : 0,
									y: fetcher.state === "submitting" ? 0 : 4,
								}}
								transition={{
									type: "tween",
									duration: 0.25,
									ease: "easeInOut",
								}}
								className="loader absolute inset-0 m-auto"
							></motion.div>
						</div>
					</motion.button>
				</div>
			</div>
		</fetcher.Form>
	);
}
