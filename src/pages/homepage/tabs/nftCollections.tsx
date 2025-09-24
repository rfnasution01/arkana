/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ImgPlaceholder from "@/assets/img/placeholder.png";
import { truncateAddress } from "@/utils/formatText";

type Props = {
	collections: any[];
};

export function NFTCollection({ collections }: Props) {
	const [selectedCollection, setSelectedCollection] = useState<any | null>(
		null
	);

	if (!collections?.length) {
		return (
			<p className="text-center text-[#858584] py-6">No collections found.</p>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
				{collections.map((col, i) => {
					const image =
						col?.image?.thumbnailUrl ||
						col?.image?.originalUrl ||
						col?.image?.pngUrl ||
						col?.image?.cachedUrl ||
						ImgPlaceholder;

					return (
						<div
							key={i}
							className="bg-[#2B2B2B] rounded-xl overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
							onClick={() => setSelectedCollection(col)}
						>
							<div className="relative w-full aspect-square">
								<img
									src={image}
									alt={col?.name || "Collection"}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-4 flex flex-col gap-2">
								<p className="text-white font-semibold text-sm md:text-base truncate">
									{col.name || "Unnamed Collection"}
								</p>
								<p className="text-[#858584] text-xs truncate">
									{truncateAddress(col.address)}
								</p>
								{col.symbol && (
									<p className="text-[#858584] text-xs truncate">
										({col.symbol})
									</p>
								)}
								<p className="text-[#858584] text-xs mt-1">
									Tokens Owned: {col.numDistinctTokensOwned ?? "—"}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Modal untuk collection */}
			{selectedCollection && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
					<div className="bg-[#2B2B2B] rounded-xl w-11/12 max-w-2xl p-6 relative overflow-y-auto scrollbar-hide max-h-[90vh]">
						<button
							className="absolute top-3 right-3 text-white text-xl font-bold"
							onClick={() => setSelectedCollection(null)}
						>
							×
						</button>
						<div className="flex flex-col gap-4">
							<img
								src={
									selectedCollection?.image?.thumbnailUrl ||
									selectedCollection?.image?.originalUrl ||
									selectedCollection?.image?.pngUrl ||
									selectedCollection?.image?.cachedUrl ||
									ImgPlaceholder
								}
								alt={selectedCollection?.name || "Collection"}
								className="w-full h-auto object-cover rounded-lg"
							/>
							<h2 className="text-white font-bold text-lg md:text-2xl">
								{selectedCollection?.name || "Unnamed Collection"}
							</h2>
							<p className="text-[#858584] truncate">
								{truncateAddress(selectedCollection?.address)}
							</p>
							{selectedCollection?.symbol && (
								<p className="text-[#858584]">
									Symbol: {selectedCollection.symbol}
								</p>
							)}
							<p className="text-[#858584]">
								Tokens Owned: {selectedCollection.numDistinctTokensOwned ?? "—"}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
