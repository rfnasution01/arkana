import { ConnectButton } from "@rainbow-me/rainbowkit";
import ImgPlaceholderImg from "@/assets/img/placeholder.png";
import ImgPlaceholderAvatarImg from "@/assets/img/avatar-placeholder.png";
import clsx from "clsx";

export function ButtonConnectWallet({ className }: { className?: string }) {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openConnectModal,
				openAccountModal,
				openChainModal,
				mounted,
			}) => {
				const connected = mounted && account && chain;

				return (
					<div
						{...(!mounted && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{!connected ? (
							<button
								onClick={openConnectModal}
								type="button"
								className={clsx(
									"text-white hover:cursor-pointer hover:bg-white/10 py-1.5 px-4 rounded-full font-medium",
									className
								)}
							>
								Connect Wallet
							</button>
						) : (
							<div className="flex items-center gap-3">
								{/* Chain Button */}
								<button
									onClick={openChainModal}
									className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white"
									type="button"
								>
									{chain.hasIcon && chain.iconUrl && (
										<img
											alt={chain.name ?? "Chain icon"}
											src={chain.iconUrl || ImgPlaceholderImg}
											className="h-4 w-4 rounded-full"
										/>
									)}
									{chain.name}
								</button>

								{/* Account Button with Profile */}
								<button
									onClick={openAccountModal}
									className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white"
									type="button"
								>
									<img
										src={ImgPlaceholderAvatarImg}
										alt="User Profile"
										className="h-5 w-5 rounded-full object-cover"
									/>
									<span>{account.displayName}</span>
								</button>
							</div>
						)}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
}
