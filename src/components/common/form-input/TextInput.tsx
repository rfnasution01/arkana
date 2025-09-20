/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { type ReactNode, useState } from "react";

interface Props<T extends FieldValues> {
	label?: string | ReactNode;
	type?:
		| "text"
		| "password"
		| "email"
		| "url"
		| "date"
		| "number"
		| "tel"
		| "file";
	htmlFor?: string;
	name: Path<T>; // ✅ FIX DISINI, pakai Path<T> bukan string biasa
	placeholder?: string;
	form: UseFormReturn<T>;
	className?: string;
	inputClassName?: string;
	labelClassName?: string;
	isRow?: boolean;
	accept?: string;
	isDisabled?: boolean;
	isNumber?: boolean;
	min?: number;
	max?: number;
	showIconPassword?: boolean;
	isRequired?: boolean;
	isReturnString?: boolean;
}

function TextInput<T extends FieldValues>({
	label,
	type = "text",
	htmlFor,
	placeholder,
	name,
	min,
	max,
	form,
	className,
	accept,
	inputClassName,
	labelClassName,
	isNumber,
	isDisabled,
	isRow = false,
	showIconPassword = true,
	isRequired = false,
	isReturnString = false,
}: Props<T>) {
	const [showPassword, setShowPassword] = useState(false);
	const isPassword = type === "password";

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem
					className={`whitespace-nowrap 
          ${
						isRow
							? ` flex flex-col gap-4 md:grid md:grid-cols-[12rem_1fr] md:flex-row md:items-center md:gap-5`
							: "flex flex-col gap-2"
					} 
          ${className}`}
				>
					<FormLabel
						className={`text-blue-500 text-sm ${labelClassName}`}
						htmlFor={htmlFor}
					>
						{label} {isRequired && <span className="text-red-500">*</span>}
					</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								id={htmlFor}
								min={min}
								onWheel={(e) => (e.target as HTMLElement).blur()}
								max={max}
								accept={accept}
								disabled={isDisabled}
								type={isPassword ? (showPassword ? "text" : "password") : type}
								placeholder={placeholder}
								className={`w-full min-h-[40px] rounded-lg focus-visible:ring-0  ${inputClassName} bg-white`}
								value={
									field.value !== undefined && field.value !== null
										? String(field.value)
										: ""
								}
								onChange={(e) => {
									let value: any = e.target.value;
									if (isNumber) {
										const filteredValue = value.replace(/[^0-9]/g, "");
										value =
											filteredValue === ""
												? ""
												: isReturnString
												? filteredValue
												: Number(filteredValue);
									}
									field.onChange(value);
								}}
							/>
							{isPassword && (
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 z-10"
								>
									{showIconPassword && (
										<>
											{showPassword ? (
												<LucideEye className="w-5 h-5" />
											) : (
												<LucideEyeClosed className="w-5 h-5" />
											)}
										</>
									)}
								</button>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default TextInput;
