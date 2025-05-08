import { useEffect, useRef } from "react";
export function randomChoice<T>(arr: T[]): T {
	const i = Math.floor(Math.random() * arr.length);
	return arr[i];
}

function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>(undefined);
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

export default usePrevious;
