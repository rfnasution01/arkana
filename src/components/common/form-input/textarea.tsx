/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import * as React from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

interface Props {
	label?: string;
	htmlFor?: string;
	name: string;
	placeholder?: string;
	form: UseFormReturn<any>;
	className?: string;
	inputClassName?: string;
	isRow?: boolean;
	isDisabled?: boolean;
}

const TextAreaInput: React.FC<Props> = ({
	label,
	htmlFor,
	placeholder,
	name,
	form,
	className,
	isDisabled,
	inputClassName,
	isRow = false,
}: Props) => {
	return (
		<>
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem
						className={`
            ${
							isRow
								? "flex flex-col gap-4 lg:grid lg:grid-cols-[12rem_1fr] lg:gap-5"
								: "flex"
						} 
        
              whitespace-nowrap
              ${className}`}
					>
						<FormLabel
							className={"whitespace-pre-line text-[#666] text-sm"}
							htmlFor={htmlFor}
						>
							{label}
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								disabled={isDisabled}
								value={field?.value ?? ""}
								className={`focus-visible:ring-0 ${inputClassName} bg-white`}
								id={htmlFor}
								placeholder={placeholder}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
export default TextAreaInput;
