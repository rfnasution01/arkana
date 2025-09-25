import { useState } from "react";
import { ButtonConnectWallet } from "@/components/common/button/buttonConnectWallet";
import { usePathname } from "@/hooks/usePathname";
import { convertToSlug } from "@/utils/formatText";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ikon hamburger & close

export function Header() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { firstPathname } = usePathname();
	const listMenu = ["Home", "MarketPlaces", "Rangkings"];

	const handleNavigate = (item: string) => {
		setOpen(false); // close menu setelah klik
		if (item === listMenu?.[0]) {
			navigate("/");
		} else {
			navigate(`/${convertToSlug(item)}`);
		}
	};

	return (
		<header className="flex w-full items-center justify-between px-4 md:px-12 lg:px-24 py-4 relative">
			{/* --- Logo --- */}
			<Link
				to={"/"}
				className="text-2xl font-extrabold bg-gradient-to-r from-[#AE67FA] to-[#F49867] bg-clip-text text-transparent tracking-wide"
			>
				Arkana
			</Link>

			{/* --- Menu Desktop --- */}
			<nav className="hidden md:flex items-center font-medium gap-12">
				{listMenu.map((item, idx) => {
					const isActive =
						firstPathname === convertToSlug(item) ||
						(item === listMenu[0] && !firstPathname);

					return (
						<div
							key={idx}
							onClick={() => handleNavigate(item)}
							className={clsx("duration-300 transition-colors cursor-pointer", {
								"text-white": isActive,
								"text-white/50 hover:text-white": !isActive,
							})}
						>
							{item}
						</div>
					);
				})}
			</nav>

			{/* --- Wallet Button (Desktop) --- */}
			<div className="hidden md:block">
				<ButtonConnectWallet />
			</div>

			{/* --- Mobile Menu Button --- */}
			<button className="md:hidden text-white" onClick={() => setOpen(!open)}>
				{open ? <X size={28} /> : <Menu size={28} />}
			</button>

			{/* --- Mobile Dropdown --- */}
			{open && (
				<div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center gap-6 py-6 z-50 md:hidden">
					{listMenu.map((item, idx) => {
						const isActive =
							firstPathname === convertToSlug(item) ||
							(item === listMenu[0] && !firstPathname);

						return (
							<div
								key={idx}
								onClick={() => handleNavigate(item)}
								className={clsx(
									"duration-300 transition-colors cursor-pointer text-lg",
									{
										"text-white": isActive,
										"text-white/50 hover:text-white": !isActive,
									}
								)}
							>
								{item}
							</div>
						);
					})}
					<ButtonConnectWallet />
				</div>
			)}
		</header>
	);
}
