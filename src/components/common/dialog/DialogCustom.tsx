import { useEffect, type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	title: string | React.ReactNode;
	description?: string | React.ReactNode;
	classname?: string;
	children: React.ReactNode;
	width?: string;
	height?: string;
}

export const DialogCustom = ({
	open,
	setOpen,
	description,
	title,
	classname,
	children,
	width = "max-w-md w-full",
	height,
}: Props) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [open]);

	if (!open) return null;

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setOpen(false);
		}
	};

	const dialog = (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			onClick={handleBackdropClick}
		>
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/50" />

			{/* Dialog */}
			{/* <div
        className={`relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 ${classname || ''}`}
      > */}
			<div
				className={`relative bg-white rounded-lg shadow-lg mx-4 ${
					classname || ""
				} ${width} ${height ? height : ""}`}
			>
				<div className="p-6">
					<h2 className="text-lg font-semibold mb-2">{title}</h2>
					{description && (
						<p className="text-sm text-gray-600 mb-4">{description}</p>
					)}
					{children}
				</div>
				<button
					onClick={() => setOpen(false)}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
				>
					✕
				</button>
			</div>
		</div>
	);

	return createPortal(dialog, document.body);
};
