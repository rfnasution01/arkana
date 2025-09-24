import { useEffect, useState } from "react";

export function useMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Fungsi untuk memeriksa apakah layar adalah mobile
		const checkIsMobile = () => {
			const isMobileView = window.matchMedia("(max-width: 64em)").matches;
			setIsMobile(isMobileView);
		};

		// Memeriksa pada saat komponen di-mount
		checkIsMobile();

		// Menambahkan event listener untuk mengubah status saat ukuran layar berubah
		window.addEventListener("resize", checkIsMobile);

		// Membersihkan event listener saat komponen di-unmount
		return () => window.removeEventListener("resize", checkIsMobile);
	}, []);

	return {
		isMobile,
	};
}
