import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="max-w-[300px] w-full space-y-6 px-4"></div>
		</main>
	);
}
