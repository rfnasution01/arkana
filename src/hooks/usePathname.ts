import { useLocation } from "react-router-dom";

export const usePathname = () => {
	const { pathname } = useLocation();

	const splittedPath = pathname.split("/");
	const firstPathname = splittedPath[1] || null;
	const secondPathname = splittedPath[2] || null;
	const thirdPathname = splittedPath[3] || null;
	const fourthPathname = splittedPath[4] || null;
	const fivethPathname = splittedPath[5] || null;
	const sixthPathname = splittedPath[6] || null;
	const seventhPathname = splittedPath[7] || null;
	const lastPathname = splittedPath[splittedPath.length - 1] || null;

	return {
		pathname,
		splittedPath,
		firstPathname,
		secondPathname,
		thirdPathname,
		lastPathname,
		fourthPathname,
		fivethPathname,
		sixthPathname,
		seventhPathname,
	};
};

export function getPaths(url: string) {
	const parts = url?.split("/");
	const result = parts?.slice(1)?.join("/");
	return result;
}
