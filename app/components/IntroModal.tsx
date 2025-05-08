import { useStore } from "@nanostores/react";
import { useEffect, useRef } from "react";
import { $isIntroModalOpen, assignRandomCountry } from "~/shared/store";
import pattern from "../assets/dots.webp";

const closeCallback = () => {
	$isIntroModalOpen.set(false);
};

export default function IntroModal() {
	const open = useStore($isIntroModalOpen);
	const ref = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (open) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [open]);

	return (
		<dialog
			ref={ref}
			onCancel={closeCallback}
			onClick={(e) => {
				if (e.target === ref.current) closeCallback();
			}}
			className="fixed inset-0 m-auto bg-transparent text-[#241F2E] backdrop:bg-[#140A29]/50"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative isolate max-w-lg overflow-clip rounded-2xl bg-white p-6"
			>
				<img
					src={pattern}
					alt=""
					className="pointer-events-none absolute top-0 left-0 -z-10 w-full select-none"
				/>
				<h1 className="mb-6 w-[15ch] text-4xl leading-[0.95]">
					Much to Learn About Countries
				</h1>
				<p className="mb-2">
					This game is a fun challenge to test your knowledge of countries!
				</p>
				<p className="mb-2">
					The rules of the game are simple. You will be given a country, and
					five tries to suggest a well-known thing from that country. Three
					correct suggestions will get you a point.
				</p>
				<p className="mb-6">
					For example, if you are given "Japan", you could suggest "Sushi",
					"Anime", or "Sakura".
				</p>
				<button
					onClick={() => {
						closeCallback();
						assignRandomCountry();
					}}
					className="starry-button-border cursor-pointer rounded-full p-1"
				>
					<div className="starry-button flex h-full items-center rounded-full px-8 py-2 text-sm leading-none text-white">
						Start Game!
					</div>
				</button>
			</div>
		</dialog>
	);
}
