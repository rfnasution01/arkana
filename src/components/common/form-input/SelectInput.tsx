/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { type ReactNode, useEffect } from "react";
import Select from "react-select";
import { Skeleton } from "@/components/ui/skeleton";

interface Props<T extends FieldValues> {
	name: Path<T>;
	form: UseFormReturn<T>;
	placeholder: string;
	data: {
		value: string;
		label: string;
	}[];
	selectItemClassName?: string;
	className?: string;
	selectClassName?: string;
	isRow?: boolean;
	isDisabled?: boolean;
	label?: string | ReactNode;
	apiValue?: any;
	isLoading?: boolean;
	isRequired?: boolean;
	fx?: (e: any) => void;
}

export const SelectBasicInput = <T extends FieldValues>({
	name,
	form,
	placeholder,
	data,
	className = "",
	selectClassName = "",
	isDisabled = false,
	isRow = false,
	apiValue,
	isRequired,
	label,
	isLoading,
	fx,
}: Props<T>) => {
	useEffect(() => {
		if (apiValue && !form.getValues(name)) {
			form.setValue(name, apiValue, { shouldValidate: true });
		}
	}, [apiValue, form, name]);

	return (
		<FormField
			name={name}
			control={form.control}
			render={({ field }) => {
				const selectedOption =
					data.find((opt) => opt.value === field.value) || null;

				return (
					<FormItem
						className={`${className} ${
							isRow
								? "flex flex-col gap-4 lg:grid md:grid-cols-[12rem_1fr] lg:gap-5"
								: "flex flex-col gap-2"
						}`}
					>
						{label && (
							<FormLabel className="text-blue-500 text-sm">
								{label}
								{isRequired && <span className="text-red-500">*</span>}
							</FormLabel>
						)}
						{isLoading ? (
							<Skeleton className="h-[40px] bg-gray-300" />
						) : (
							<Select
								isDisabled={isDisabled}
								options={data}
								value={selectedOption}
								placeholder={placeholder}
								onChange={(option) => {
									field.onChange(option ? option.value : "");
									if (fx) {
										fx(option);
									}
								}}
								classNamePrefix="react-select"
								className={`min-h-[40px] ${selectClassName}`}
							/>
						)}

						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};
