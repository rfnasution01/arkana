/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";

interface optionRadio {
	label: string;
	value: string | boolean;
}

interface Props<T extends FieldValues> {
	label?: string;
	name: Path<T>;
	form: UseFormReturn<T>;
	data: optionRadio[];
	className?: string;
	isRow?: boolean;
	isDisabled?: boolean;
	isRequired?: boolean;
	fx?: (e: any) => void;
}

function RadioInput<T extends FieldValues>({
	label,
	name,
	form,
	data,
	fx,
	className,
	isRow = false,
	isDisabled = false,
	isRequired = false,
}: Props<T>) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem
					className={`${
						isRow
							? "grid grid-cols-[12rem_1fr] items-center gap-5"
							: "flex flex-col gap-2"
					} ${className}`}
				>
					{label && (
						<FormLabel className={"text-blue-500 text-sm"}>
							{label} {isRequired && <span className="text-red-500">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<RadioGroup
							value={String(field.value)}
							onValueChange={(val) => {
								const selectedOption = data.find(
									(d) => String(d.value) === val
								);
								field.onChange(
									typeof selectedOption?.value === "boolean"
										? selectedOption.value
										: val
								);
								if (fx) {
									fx(field.value);
								}
							}}
							disabled={isDisabled}
							className="flex gap-4 flex-wrap"
						>
							{data.map((option, index) => (
								<div key={index} className="flex items-center gap-2">
									<RadioGroupItem
										className="bg-white"
										value={String(option.value)}
										id={`${name}-${option.value}`}
									/>
									<Label
										className="text-gray-500"
										htmlFor={`${name}-${option.value}`}
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default RadioInput;
