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
			className="backdrop:bg-black/50 fixed inset-0 m-auto bg-transparent text-[#616161]"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-white relative isolate p-6 rounded-2xl overflow-clip max-w-lg"
			>
				<img
					src={pattern}
					alt=""
					className="absolute top-0 left-0 w-full -z-10 pointer-events-none"
				/>
				<h1 className="text-4xl mb-6 w-[15ch]">
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
					className="rounded-full p-1 starry-button-border"
				>
					<div className="flex items-center py-2 px-8 h-full rounded-full starry-button text-white text-sm leading-none">
						Close
					</div>
				</button>
			</div>
		</dialog>
	);
}
