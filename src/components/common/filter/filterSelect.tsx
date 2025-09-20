import { SelectCustom } from "@/components/common/select-custom/SelectCustom.tsx";
import { useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label.tsx";
import { X } from "lucide-react";

interface Props {
	placeholder: string;
	name: string;
	label?: string;
	className?: string;
	selectClassName?: string;
	data: { label: string; value: string }[];
}

export const FilterSelect = ({
	data,
	selectClassName,
	label,
	name,
	className,
	placeholder,
}: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const HandleFilter = (name: string, value: string) => {
		const searchUrl = new URLSearchParams(searchParams);
		searchUrl.set(name, value);
		if (value === "") {
			searchUrl.delete(name);
		}
		setSearchParams(searchUrl);
	};

	const HandleClear = () => {
		HandleFilter(name, "");
	};

	return (
		<>
			<div className={`flex w-fit items-center gap-x-8 relative ${className}`}>
				{label && <Label htmlFor={name}>{label}</Label>}
				<SelectCustom
					className={`bg-white text-black ${
						searchParams.get(name) ? "pr-5" : ""
					} 
          ${selectClassName}`}
					placeholder={placeholder}
					data={data}
					value={searchParams.get(name) ?? ""}
					onChangeValue={(e) => {
						HandleFilter(name, e);
					}}
				/>
				{searchParams.get(name) && (
					<X
						onClick={HandleClear}
						className={
							"hover:text-red-500 z-10 text-red-500 right-1 size-3 absolute"
						}
					/>
				)}
			</div>
		</>
	);
};
