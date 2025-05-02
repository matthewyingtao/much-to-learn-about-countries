import { atom } from "nanostores";
import { countries } from "~/data/countries";

export const $history = atom<
	{
		country: string;
		suggestion: string;
		pass: boolean;
		response: string;
	}[]
>([]);

export const $currentCountry = atom("");

export const $countriesAvailable = atom<string[]>(countries);
export const $countriesCompleted = atom<string[]>([]);

export const $isIntroModalOpen = atom(true);
