import { atom, computed, effect } from "nanostores";
import { countries } from "~/data/countries";
import { randomChoice } from "./utils";
import type { CountryResponse } from "./zodTypes";

export type Guess = {
	suggestion: string;
	pass: boolean | null;
	response: string;
};

export const $history = atom<
	{
		country: string;
		guesses: Guess[];
	}[]
>([]);

export function submitGuess(suggestion: string) {
	const newGuess: Guess = {
		suggestion,
		pass: null,
		response: "Loading…",
	};

	const history = $history.get();

	const lastIndex = history.length - 1;
	if (lastIndex < 0) return;

	const updatedHistory = history.map((entry, i) => {
		if (i === lastIndex) {
			return {
				...entry,
				guesses: [...entry.guesses, newGuess],
			};
		}
		return entry;
	});

	$history.set(updatedHistory);
}

export function updateGuessResponse(response: CountryResponse) {
	const history = $history.get();

	const lastIndex = history.length - 1;

	const updatedHistory = history.map((entry, i) => {
		if (i === lastIndex) {
			const recentGuessIndex = entry.guesses.length - 1;

			const updatedGuesses = entry.guesses.map((guess, i) => {
				if (i === recentGuessIndex) {
					return {
						...guess,
						pass: response.pass,
						response: response.response,
					};
				}
				return guess;
			});
			return {
				...entry,
				guesses: updatedGuesses,
			};
		}
		return entry;
	});

	$history.set(updatedHistory);
}

export const $currentCountryAttempts = computed($history, ($history) => {
	const currentCountry = $currentCountry.get();
	const current = $history.find((h) => h.country === currentCountry);
	if (!current) {
		return [];
	}
	return current.guesses;
});

export const $overallScore = computed($history, (history) => {
	return history.reduce((prev, curr) => {
		const correctGuesses = curr.guesses.filter(
			(item) => item.pass === true,
		).length;
		const incorrectGuesses = curr.guesses.filter(
			(item) => item.pass === false,
		).length;

		if (correctGuesses >= 3) {
			return prev + 1;
		}

		if (incorrectGuesses >= 3) {
			return prev;
		}

		return prev;
	}, 0);
});

export const $currentCountry = atom("");
export const $countriesAvailable = atom<string[]>(countries);
export const $countriesCompleted = atom<string[]>([]);

export function assignRandomCountry() {
	const currentCountry = $currentCountry.get();

	// if not the first country, add the current country to completed
	if (currentCountry) {
		$countriesCompleted.set([...$countriesCompleted.get(), currentCountry]);
	}

	const newCountry = randomChoice($countriesAvailable.get());

	// remove the new country from the pool
	$countriesAvailable.set(
		$countriesAvailable.get().filter((country) => country !== newCountry),
	);

	$history.set([
		...$history.get(),
		{
			country: newCountry,
			guesses: [],
		},
	]);

	$currentCountry.set(newCountry);
}

const assignANewCountryOnScoreChange = effect($overallScore, () => {
	assignRandomCountry();
});

export const $isIntroModalOpen = atom(true);
