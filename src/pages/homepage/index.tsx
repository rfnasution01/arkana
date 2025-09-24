import { useAccount } from "wagmi";
import { HomeConnected } from "./homeConnected";
import { HomeNotConnected } from "./homeNotConnected";

export default function Homepage() {
	const { address, isConnected, chain } = useAccount();

	return (
		<>
			<div className="w-full h-fit flex flex-col">
				{isConnected ? (
					<HomeConnected address={address} chain={chain} />
				) : (
					<HomeNotConnected />
				)}
			</div>
		</>
	);
}
