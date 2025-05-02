import {
	$attempts,
	$countriesAvailable,
	$countriesCompleted,
	$currentCountry,
} from "./store";

export function randomChoice<T>(arr: T[]): T {
	const i = Math.floor(Math.random() * arr.length);
	return arr[i];
}

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

	$currentCountry.set(newCountry);
}

export const resetAttempts = () => $attempts.set([]);

export const skip = () => {
	resetAttempts();
	assignRandomCountry();
};
