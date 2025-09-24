/* eslint-disable @typescript-eslint/no-explicit-any */
import ImgCover from "@/assets/img/cover.png";
import ImgAvatar from "@/assets/img/avatar-placeholder.png";
import { truncateAddress } from "@/utils/formatText";
import { Copy, Globe, Instagram, Plus, Twitter, Youtube } from "lucide-react";
import { toast } from "react-toastify";
import { Chain } from "wagmi/chains";
import { useState } from "react";
import clsx from "clsx";
import { useGetNFTs } from "./hooks/useGetNFTs";
import { NFTOwned } from "./tabs/nftOwned";
import { NFTCollection } from "./tabs/nftCollections";

export function HomeConnected({
	address,
	chain,
}: {
	address: `0x${string}`;
	chain: Chain;
}) {
	const {
		owned,
		collections,
		created,
		loading,
		collectionCount,
		createdCount,
		ownedCount,
	} = useGetNFTs(address, chain?.id);

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			toast.success("Copied succesfully");
		});
	};

	const tabs = [
		{ label: "Created", value: created?.length, data: created },
		{ label: "Owned", value: owned?.length, data: owned },
		{ label: "Collections", value: collections?.length, data: collections },
	];

	const [selected, setSelected] = useState<string>(tabs?.[0]?.label);

	const content = () => {
		if (loading) {
			// Loading state
			return (
				<div className="w-full flex justify-center items-center py-20">
					<p className="text-white opacity-70 text-lg">Loading...</p>
				</div>
			);
		}

		const current = tabs.find((t) => t.label === selected);
		if (!current) return null;

		if (selected === "Collections") {
			if (loading) {
				return (
					<div className="w-full flex justify-center items-center py-20">
						<p className="text-white opacity-70 text-lg">Loading...</p>
					</div>
				);
			}
			return <NFTCollection collections={collections} />;
		}

		return current.data?.length ? (
			<NFTOwned
				nfts={current.data}
				category={selected.toLowerCase() as any}
				address={address}
			/>
		) : (
			<p className="text-white opacity-70 text-center py-10">
				No NFTs found in {selected}.
			</p>
		);
	};

	return (
		<div className="bg-[#2B2B2B]">
			<div className="flex flex-col">
				{/* --- Cover --- */}
				<div className="relative">
					<img
						src={ImgCover}
						alt="Cover"
						className="w-full h-64 md:h-80 lg:h-96 object-cover"
					/>
					<div
						className="absolute top-0 left-0 h-full w-full"
						style={{
							background: `
                linear-gradient(
                  to top,
                  rgba(151, 71, 255, 0.5) 10%,  
                  rgba(151, 71, 255, 0) 80%    
                )
              `,
						}}
					/>
					{/* Avatar */}
					<div className="absolute bottom-0 transform -translate-y-1/2 left-4 md:left-12 lg:left-24">
						<img
							src={ImgAvatar}
							alt="Avatar"
							className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-xl border-4 border-[#2B2B2B]"
						/>
					</div>
				</div>

				{/* --- Bio Section --- */}
				<div className="flex flex-col gap-6 px-4 sm:px-6 md:px-12 lg:px-24 mt-16">
					{/* Name + Address + Follow */}
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap">
						<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold break-all">
							{truncateAddress(address)}
						</h2>
						<div className="flex flex-wrap items-center gap-2 md:gap-4">
							<button
								type="button"
								onClick={() => handleCopy(address || "")}
								className="bg-[#A259FF] flex py-1.5 px-4 rounded-lg items-center gap-2 text-white hover:bg-[#A259FF]/80 transition"
							>
								<Copy size={16} />
								{truncateAddress(address || "")}
							</button>
							<button className="border flex items-center gap-2 border-[#A259FF] text-white py-1.5 px-4 rounded-lg hover:bg-[#A259FF]/20 transition">
								<Plus size={16} />
								<p>Follow</p>
							</button>
						</div>
					</div>

					{/* Stats */}
					<div className="flex flex-wrap gap-6">
						<LabelComponent label="NFTs Owned" value={ownedCount.toString()} />
						<LabelComponent
							label="Collections"
							value={collectionCount.toString()}
						/>
						<LabelComponent label="Created" value={createdCount.toString()} />
					</div>

					{/* Bio */}
					<div className="flex flex-col gap-1">
						<p className="font-bold font-mono text-[#858584] text-lg">Bio</p>
						<p className="font-thin">
							Showing your Web3 identity powered by Alchemy.
						</p>
					</div>

					{/* Links */}
					<div className="flex flex-col gap-1">
						<p className="font-bold font-mono text-[#858584] text-lg">Links</p>
						<div className="flex flex-wrap items-center gap-3 text-[#858584]">
							<Globe size={18} />
							<Youtube size={18} />
							<Twitter size={18} />
							<Instagram size={18} />
						</div>
					</div>
				</div>

				{/* --- NFT Tabs --- */}
				<div className="flex flex-col gap-0 mt-6">
					<div className="flex flex-wrap items-center px-4 sm:px-6 md:px-12 lg:px-24 gap-2">
						{tabs?.map((item, idx) => {
							const isActive = selected === item?.label;
							return (
								<div
									onClick={() => setSelected(item?.label)}
									className={clsx(
										"flex group border-b py-2 duration-300 hover:cursor-pointer items-center gap-2 min-w-[8rem] text-center justify-center",
										{
											"border-transparent": !isActive,
											"border-[#858584]": isActive,
										}
									)}
									key={idx}
								>
									<p
										className={clsx("font-bold transition-colors", {
											"text-white": isActive,
											"group-hover:text-white text-[#858584]": !isActive,
										})}
									>
										{item?.label}
									</p>
									<p
										className={clsx(
											"text-xs py-1 px-3 rounded-full font-thin",
											{
												"bg-[#858584]": isActive,
												"bg-[#3B3B3B]": !isActive,
											}
										)}
									>
										{item?.value}
									</p>
								</div>
							);
						})}
					</div>
					<div className="flex flex-col py-8 bg-[#3B3B3B] px-4 sm:px-6 md:px-12 lg:px-24">
						{content()}
					</div>
				</div>
			</div>
		</div>
	);
}

function LabelComponent({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-0">
			<p className="text-xl font-bold font-mono">{value}</p>
			<p className="font-thin">{label}</p>
		</div>
	);
}
