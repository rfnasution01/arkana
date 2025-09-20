import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import DateInput from "./DateInput";

interface Props<T extends FieldValues> {
	label?: string;
	name: Path<T>; // ✅ FIX DISINI, pakai Path<T> bukan string biasa
	placeholder?: string;
	form: UseFormReturn<T>;
	className?: string;
	inputClassName?: string;
	isRow?: boolean;
	isDisabled?: boolean;
	isRequired?: boolean;
}

function DateInputTwo<T extends FieldValues>({
	label,

	placeholder,
	name,

	form,
	className,

	isDisabled,
	isRow = false,

	isRequired = false,
}: Props<T>) {
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
					<FormLabel className={"text-blue-500 text-sm"}>
						{label} {isRequired && <span className="text-red-500">*</span>}
					</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<DateInput
								value={form.watch(name)}
								isDisabled={isDisabled}
								placeholder={placeholder}
								onSave={(value) => {
									field.onChange(value);
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

export default DateInputTwo;
