import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { href, useFetcher } from "react-router";
import {
	$currentCountry,
	$history,
	$overallScore,
	submitGuess,
	updateGuessResponse,
} from "~/shared/store";
import type { CountryResponse } from "~/shared/zodTypes.server";

export default function SuggestionForm() {
	const fetcher = useFetcher<CountryResponse>();

	const overallScore = useStore($overallScore);
	const country = useStore($currentCountry);

	useEffect(() => {
		if (!fetcher.data) return;
		updateGuessResponse(fetcher.data);
	}, [fetcher.data]);

	const [suggestion, setSuggestion] = useState("");

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
			{/* hidden form value */}
			<input name="country" hidden value={country} readOnly />
			<div className="mb-2 grid grid-cols-[1fr_auto] items-start justify-between gap-x-2">
				<p>
					<span className="text-xl font-bold tracking-wide uppercase opacity-50">
						Current Country
					</span>
					<AnimatePresence mode="popLayout">
						<motion.span
							layout
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
							exit={{ opacity: 0, y: -8 }}
							key={country}
							transition={{ type: "spring", bounce: 0, duration: 0.5 }}
							className="block text-4xl leading-[0.9]"
						>
							{country}
						</motion.span>
					</AnimatePresence>
				</p>

				<p className="relative grid text-right">
					<span className="text-xl font-bold tracking-wide uppercase opacity-50">
						Score
					</span>
					<AnimatePresence mode="popLayout">
						<motion.span
							layout
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							key={overallScore}
							transition={{ type: "spring", bounce: 0, duration: 0.5 }}
							className="block text-4xl leading-[0.9]"
						>
							{overallScore}
						</motion.span>
					</AnimatePresence>
				</p>
			</div>

			<div className="overflow-hidden rounded-full bg-gradient-to-b from-gray-300 to-white p-1 shadow-md">
				<div className="flex overflow-hidden rounded-full bg-gradient-to-b from-white to-gray-300">
					<input
						type="text"
						name="suggestion"
						className="w-full rounded-full p-2 outline-current"
						value={suggestion}
						autoComplete="off"
						onChange={(e) => {
							const val = e.target.value;
							setSuggestion(val);

							const currentCountryGuesses = $history
								.get()
								.at(-1)!
								.guesses.map((g) => g.suggestion.trim().toLowerCase());

							const alreadyGuessed = currentCountryGuesses.includes(
								val.trim().toLowerCase(),
							);

							if (alreadyGuessed) {
								e.target.setCustomValidity(
									`You've already guessed "${val}" for ${country}.`,
								);
							} else {
								e.target.setCustomValidity("");
							}
						}}
						minLength={2}
						maxLength={100}
						required
					/>
					<button
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
					</button>
				</div>
			</div>
		</fetcher.Form>
	);
}
