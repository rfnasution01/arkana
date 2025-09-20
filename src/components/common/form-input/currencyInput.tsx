import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props<T extends FieldValues> {
	label?: string;
	htmlFor?: string;
	name: Path<T>;
	placeholder?: string;
	form: UseFormReturn<T>;
	className?: string;
	inputClassName?: string;
	isRow?: boolean;
	isDisabled?: boolean;
	min?: number;
	max?: number;
}

function CurrencyInput<T extends FieldValues>({
	label,
	htmlFor,
	placeholder,
	name,
	min,
	max,
	form,
	className,
	inputClassName,
	isDisabled,
	isRow = false,
}: Props<T>) {
	const [display, setDisplay] = useState("");

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem
					className={`whitespace-nowrap 
          ${
						isRow
							? `flex flex-col gap-4 md:grid md:grid-cols-[12rem_1fr] md:flex-row md:items-center md:gap-5`
							: "flex flex-col gap-2"
					} 
          ${className}`}
				>
					<FormLabel className={"text-gray-600"} htmlFor={htmlFor}>
						{label}
					</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								id={htmlFor}
								min={min}
								max={max}
								disabled={isDisabled}
								type="text"
								placeholder={placeholder ?? "Rp 0"}
								className={`w-full focus-visible:ring-0 rounded text-start ${inputClassName}`}
								value={
									display ||
									(field.value
										? "Rp " + Number(field.value).toLocaleString("id-ID")
										: "")
								}
								onChange={(e) => {
									const raw = e.target.value.replace(/\D/g, "");
									const num = raw ? parseInt(raw, 10) : 0;

									setDisplay(raw ? "Rp " + num.toLocaleString("id-ID") : "");
									field.onChange(num); // ✅ simpan angka murni ke react-hook-form
								}}
							/>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default CurrencyInput;
