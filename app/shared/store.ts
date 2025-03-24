import { atom } from "nanostores";

export const $history = atom<
	{
		country: string;
		suggestion: string;
		pass: boolean;
		response: string;
	}[]
>([]);

export const $currentCountry = atom("");
