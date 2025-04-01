import { $countriesAvailable, $countriesCompleted, $currentCountry } from "./store";

export function randomChoice<T>(arr: T[]): T {
	const i = Math.floor(Math.random() * arr.length);
	return arr[i];
}

export function assignRandomCountry() {
	const currentCountry = $currentCountry.get();

	if (currentCountry) {
		$countriesCompleted.set(([...$countriesCompleted.get(), currentCountry]))
	}

	const newCountry = randomChoice($countriesAvailable.get());

	$countriesAvailable.set(
		$countriesAvailable.get().filter((country) => country !== newCountry)
	);

	$currentCountry.set(newCountry);
}
