import { Alchemy, Network } from "alchemy-sdk";

export function useAlchemy(chainId?: number) {
	const networkMap: Record<number, Network> = {
		1: Network.ETH_MAINNET,
		11155111: Network.ETH_SEPOLIA,
		137: Network.MATIC_MAINNET,
		80001: Network.MATIC_MUMBAI,
		56: Network.BNB_MAINNET,
		97: Network.BNB_TESTNET,
		42161: Network.ARB_MAINNET,
		421614: Network.ARB_SEPOLIA,
		10: Network.OPT_MAINNET,
		11155420: Network.OPT_SEPOLIA,
	};

	const settings = {
		apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
		network: networkMap[chainId],
	};

	return new Alchemy(settings);
}
