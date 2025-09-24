import { useEffect, useState } from "react";
import { ButtonConnectWallet } from "@/components/common/button/buttonConnectWallet";
import ImgDummy from "@/assets/img/dummy.png";

export function HomeNotConnected() {
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const targetDate = new Date().getTime() + 9 * 60 * 60 * 1000;

		const updateCountdown = () => {
			const now = new Date().getTime();
			const distance = targetDate - now;

			if (distance <= 0) {
				setTimeLeft("Expired");
				return;
			}

			const hours = Math.floor(distance / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			setTimeLeft(
				`${String(hours).padStart(2, "0")}:${String(minutes).padStart(
					2,
					"0"
				)}:${String(seconds).padStart(2, "0")}`
			);
		};

		updateCountdown();
		const timer = setInterval(updateCountdown, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<div className="flex flex-col lg:flex-row py-8 px-4 md:px-12 lg:px-24 w-full gap-8">
				{/* hero */}
				<div className="flex w-full flex-col gap-4 text-center lg:text-left">
					<p className="font-bold text-4xl md:text-6xl lg:text-8xl leading-tight lg:leading-[1.3]">
						Connect & Explore Your NFTs
					</p>
					<p className="font-thin text-sm md:text-base lg:text-lg uppercase">
						Simple way to link your wallet and showcase your digital art
						collection
					</p>
					<div className="flex justify-center lg:justify-start">
						<ButtonConnectWallet className="bg-gradient-to-r from-[#A259FF] to-[#C584F5] text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:opacity-90 transition" />
					</div>
				</div>

				{/* --- Image Cards --- */}
				<div className="relative flex w-full items-center justify-center mt-8 lg:mt-0">
					{/* Card 1 */}
					<div
						className="absolute w-56 h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-2xl opacity-30 -rotate-[14deg]"
						style={{
							transformOrigin: "bottom left",
							background: `
								linear-gradient(
									160deg,      
									#C584F5 0%,
									#DACEE1 50%,
									#0D2986 100%
								)
							`,
						}}
					></div>

					{/* Card 2 */}
					<div
						className="absolute w-56 h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-2xl opacity-30 -rotate-[7deg]"
						style={{
							transformOrigin: "bottom left",
							background: `
								linear-gradient(
									160deg,      
									#C584F5 0%,
									#DACEE1 50%,
									#0D2986 100%
								)
							`,
						}}
					></div>

					{/* Card 3 (utama) */}
					<div
						className="relative w-56 h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden shadow-xl z-10 flex flex-col justify-between"
						style={{
							transformOrigin: "bottom left",
							background: `
								linear-gradient(
									160deg,      
									#C584F5 0%,
									#DACEE1 50%,
									#0D2986 100%
								)
							`,
						}}
					>
						<img
							src={ImgDummy}
							alt="NFT"
							className="w-full h-full object-cover"
						/>

						{/* Info Section */}
						<div className="absolute bottom-0 left-0 w-full flex justify-between items-center px-3 md:px-4 py-2 md:py-3 bg-gradient-to-t from-black/60 to-transparent text-white text-xs md:text-sm">
							<div className="flex flex-col">
								<span className="opacity-70">Current Bid</span>
								<span className="font-bold text-base md:text-lg">
									20.88 ETH
								</span>
							</div>
							<div className="flex flex-col text-right">
								<span className="opacity-70">Remaining Time</span>
								<span className="font-bold text-base md:text-lg">
									{timeLeft}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
