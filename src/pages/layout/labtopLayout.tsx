import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";

export function LabtopLayout() {
	return (
		<div className="relative flex h-full bg-[#0E0E10] w-full scrollbar-hide flex-col overflow-auto">
			{/* Lingkaran blur pink */}
			<div
				className="absolute rounded-full bg-[#C689F9] opacity-30 blur-3xl"
				style={{
					width: "617px",
					height: "591px",
					top: "-152px", // atur sesuai posisi yang kamu mau
					left: "-157px", // atur sesuai posisi yang kamu mau
				}}
			></div>

			<div className="flex flex-col font-sans text-white w-full h-fit">
				{/* --- Header --- */}
				<Header />
				{/* --- Konten --- */}
				<Outlet />
				{/* --- Footer --- */}
				<Footer />
			</div>
		</div>
	);
}
