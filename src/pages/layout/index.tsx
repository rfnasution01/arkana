import { LabtopLayout } from "./labtopLayout";

export default function MainLayout() {
	return (
		<div className="flex h-screen w-screen overflow-auto scrollbar-hide flex-col bg-[#1E1E1E]">
			<LabtopLayout />
		</div>
	);
}
