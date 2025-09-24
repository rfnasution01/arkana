/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NftFilters, OwnedNft, NftContractForOwner } from "alchemy-sdk";
import { useAlchemy } from "../controllers/useAlchemy";

export function useGetNFTs(address: string, chainId?: number) {
	const alchemy = useAlchemy(chainId);

	const [owned, setOwned] = useState<OwnedNft[]>([]);
	const [collections, setCollections] = useState<NftContractForOwner[]>([]);
	const [created, setCreated] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	// 🔥 tambahan count states
	const [ownedCount, setOwnedCount] = useState<number>(0);
	const [collectionCount, setCollectionCount] = useState<number>(0);
	const [createdCount, setCreatedCount] = useState<number>(0);

	useEffect(() => {
		if (!address) return;

		async function fetchNFTs() {
			setLoading(true);
			try {
				const res = await alchemy.nft.getNftsForOwner(address, {
					omitMetadata: false,
					excludeFilters: [NftFilters.SPAM],
				});

				setOwned(res.ownedNfts);
				setOwnedCount(res.totalCount);

				// ambil unique collections
				const uniqueCollections = [
					...new Map(
						res.ownedNfts.map((nft) => [nft.contract.address, nft.contract])
					).values(),
				];

				const resCollections = await alchemy.nft.getContractsForOwner(address, {
					excludeFilters: [NftFilters.SPAM],
				});
				setCollections(resCollections.contracts);
				setCollectionCount(resCollections.contracts.length);

				// cari koleksi yang contract deployer = address (NFT yang "diciptakan")
				const contracts = await Promise.all(
					uniqueCollections.map(async (c) =>
						alchemy.nft.getContractMetadata(c.address)
					)
				);

				const createdContracts = contracts.filter(
					(c) => c.contractDeployer?.toLowerCase() === address.toLowerCase()
				);
				setCreated(createdContracts);
				setCreatedCount(createdContracts.length);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}

		fetchNFTs();
	}, [address, chainId]);

	return {
		owned,
		collections,
		created,
		loading,
		ownedCount,
		collectionCount,
		createdCount,
	};
}
