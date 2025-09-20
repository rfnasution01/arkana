interface Props {
	loadingAction: boolean;
	className?: string;
}

const LoadingAnimate = ({ loadingAction, className }: Props) => {
	return (
		<>
			{loadingAction && (
				<div
					className={`flex items-center gap-2 top-0 w-full overflow-hidden h-dvh justify-center fixed z-[999999] bg-black/10 ${
						className ?? ""
					}`}
				>
					<div className="loader-spinner"></div>
					<div className="loader-text text-primary"></div>
				</div>
			)}
		</>
	);
};
export default LoadingAnimate;
