/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import ImgPlaceholder from "@/assets/img/placeholder.png";
import ImgAvatarPlaceholder from "@/assets/img/avatar-placeholder.png";

type Props = {
	nfts: any[];
	category: "owned" | "collection" | "created";
	address: string;
};

export function NFTOwned({ nfts, category, address }: Props) {
	const [selectedNFT, setSelectedNFT] = useState<any | null>(null);

	const filtered = useMemo(() => {
		if (category === "owned") return nfts;
		if (category === "collection") return nfts;
		if (category === "created") return nfts;
		return [];
	}, [nfts, category]);

	if (!filtered.length) {
		return (
			<p className="text-center text-[#858584] py-6">
				No NFTs found in this category.
			</p>
		);
	}

	return (
		<>
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
				{filtered.map((nft: any, i: number) => {
					const image =
						nft?.image?.thumbnailUrl ||
						nft?.image?.originalUrl ||
						nft?.image?.pngUrl ||
						nft?.image?.cachedUrl ||
						ImgPlaceholder;

					const isSpam = nft?.spamInfo?.isSpam;
					const isAirdrop = nft?.spamInfo?.categories?.includes("AIRDROP");

					const price = nft?.price ?? "—";
					const highestBid = nft?.highestBid ?? "—";

					return (
						<div
							key={i}
							className="bg-[#2B2B2B] rounded-xl overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
							onClick={() => setSelectedNFT(nft)}
						>
							<div className="relative w-full aspect-square">
								<img
									src={image}
									alt={nft?.title || nft?.name || "NFT"}
									className="w-full h-full object-cover"
								/>
								{isSpam && (
									<span className="absolute top-2 left-2 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
										Spam
									</span>
								)}
								{isAirdrop && !isSpam && (
									<span className="absolute top-2 left-2 text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
										Airdrop
									</span>
								)}
							</div>
							<div className="p-4 flex flex-col gap-3">
								<p className="text-white font-semibold text-sm md:text-base truncate">
									{nft?.name || nft?.title || "Unnamed NFT"}
								</p>
								<div className="flex items-center gap-2">
									<img
										src={ImgAvatarPlaceholder}
										alt="Owner"
										className="w-5 h-5 rounded-full object-cover"
									/>
									<p className="text-[#858584] text-xs sm:text-sm truncate">
										{address}
									</p>
								</div>
								<div className="flex justify-between mt-2 gap-4">
									<div className="flex flex-col">
										<p className="text-[#858584] text-[10px] sm:text-xs font-mono">
											Price
										</p>
										<p className="text-white font-medium text-sm sm:text-base truncate">
											{price}
										</p>
									</div>
									<div className="flex flex-col">
										<p className="text-[#858584] text-[10px] sm:text-xs font-mono">
											Highest Bid
										</p>
										<p className="text-white font-medium text-sm sm:text-base truncate">
											{highestBid}
										</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Modal */}
			{selectedNFT && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
					<div className="bg-[#2B2B2B] rounded-xl w-11/12 max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
						<button
							className="absolute top-3 right-3 text-white text-xl font-bold"
							onClick={() => setSelectedNFT(null)}
						>
							×
						</button>
						<div className="flex flex-col md:flex-row gap-6">
							<img
								src={
									selectedNFT?.image?.thumbnailUrl ||
									selectedNFT?.image?.originalUrl ||
									selectedNFT?.image?.pngUrl ||
									selectedNFT?.image?.cachedUrl ||
									ImgPlaceholder
								}
								alt={selectedNFT?.title || "NFT"}
								className="w-full md:w-1/2 h-auto object-cover rounded-lg"
							/>
							<div className="flex flex-col gap-3 md:w-1/2">
								<h2 className="text-white font-bold text-lg md:text-2xl">
									{selectedNFT?.name || selectedNFT?.title || "Unnamed NFT"}
								</h2>
								<div className="flex items-center gap-2">
									<img
										src={ImgAvatarPlaceholder}
										alt="Owner"
										className="w-6 h-6 rounded-full object-cover"
									/>
									<p className="text-[#858584] truncate">{address}</p>
								</div>
								<div className="flex gap-6 mt-2">
									<div className="flex flex-col">
										<p className="text-[#858584] font-mono text-sm">Price</p>
										<p className="text-white font-medium">
											{selectedNFT?.price ?? "—"}
										</p>
									</div>
									<div className="flex flex-col">
										<p className="text-[#858584] font-mono text-sm">
											Highest Bid
										</p>
										<p className="text-white font-medium">
											{selectedNFT?.highestBid ?? "—"}
										</p>
									</div>
								</div>
								{selectedNFT?.description && (
									<p className="text-[#858584] mt-4 text-sm md:text-base">
										{selectedNFT.description}
									</p>
								)}
								{selectedNFT?.spamInfo?.isSpam && (
									<span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full w-fit mt-2">
										Spam
									</span>
								)}
								{selectedNFT?.spamInfo?.categories?.includes("AIRDROP") &&
									!selectedNFT?.spamInfo?.isSpam && (
										<span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full w-fit mt-2">
											Airdrop
										</span>
									)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
