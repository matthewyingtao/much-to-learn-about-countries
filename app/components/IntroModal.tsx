import { useEffect, useRef } from "react";
import pattern from "../assets/dots.png";

export default function IntroModal({
	open,
	closeCallback,
}: {
	open: boolean;
	closeCallback: () => void;
}) {
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
			className="fixed inset-0 m-auto bg-transparent text-[#616161] backdrop:bg-black/50"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative isolate max-w-lg overflow-clip rounded-2xl bg-white p-6"
			>
				<img
					src={pattern}
					alt=""
					className="pointer-events-none absolute top-0 left-0 -z-10 w-full"
				/>
				<h1 className="mb-6 w-[15ch] text-4xl">
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
					onClick={closeCallback}
					className="starry-button-border cursor-pointer rounded-full p-1"
				>
					<div className="starry-button flex h-full items-center rounded-full px-8 py-2 text-sm leading-none text-white">
						Close
					</div>
				</button>
			</div>
		</dialog>
	);
}
