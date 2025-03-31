import { $countriesAvailable, $currentCountry } from "./store";

export function randomChoice<T>(arr: T[]): T {
	const i = Math.floor(Math.random() * arr.length);
	return arr[i];
}

export function assignRandomCountry() {
	const newCountry = randomChoice($countriesAvailable.get());

	$countriesAvailable.set(
		$countriesAvailable.get().filter((country) => country !== newCountry)
	);

	$currentCountry.set(newCountry);
}
