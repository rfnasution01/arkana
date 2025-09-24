import { ButtonConnectWallet } from "@/components/common/button/buttonConnectWallet";
import { usePathname } from "@/hooks/usePathname";
import { convertToSlug } from "@/utils/formatText";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
	const navigate = useNavigate();
	const { firstPathname } = usePathname();
	const listMenu = ["Home", "MarketPlaces", "Rangkings"];
	return (
		<div className="flex w-full items-center gap-8 justify-between px-4 md:px-12 lg:px-24 py-4">
			{/* --- Logo --- */}
			<Link
				to={"/"}
				className="text-2xl font-extrabold bg-gradient-to-r from-[#AE67FA] to-[#F49867] bg-clip-text text-transparent tracking-wide"
			>
				Arkana
			</Link>
			<div className="flex items-center font-medium gap-12">
				{listMenu?.map((item, idx) => {
					const isActive =
						firstPathname === convertToSlug(item) ||
						(item === listMenu?.[0] && !firstPathname);
					return (
						<div
							className={clsx("duration-300 transition-colors cursor-pointer", {
								"text-white": isActive,
								"text-white/50 hover:text-white": !isActive,
							})}
							onClick={() => {
								if (item === listMenu?.[0]) {
									navigate("/");
								} else {
									navigate(`/${convertToSlug(item)}`);
								}
							}}
							key={idx}
						>
							{item}
						</div>
					);
				})}
			</div>
			<ButtonConnectWallet />
		</div>
	);
}
