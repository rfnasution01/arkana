// src/providers/index.tsx
import { type ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
	mainnet,
	polygon,
	arbitrum,
	optimism,
	bsc,
	base,
	zksync,
	opBNB,
} from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// Wagmi + RainbowKit config
const config = getDefaultConfig({
	appName: "Arkana DApp",
	projectId: import.meta.env.VITE_REOWN_API_KEY as string,
	chains: [mainnet, polygon, arbitrum, optimism, base, bsc, zksync, opBNB], // ✅ Multi-chain support
	ssr: false,
});

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				{/* ❌ Jangan pakai chains={config.chains}, cukup seperti ini */}
				<RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
