import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import type { ReactNode } from "react";

interface Props {
	value: string;
	title: string | React.ReactNode;
	children: ReactNode;
	className?: string;
}

export const CustomAccordions = ({
	className,
	children,
	title,
	value,
}: Props) => {
	return (
		<>
			<AccordionItem value={value}>
				<AccordionTrigger className={"hover:no-underline text-lg p-4 rounded"}>
					{title}
				</AccordionTrigger>
				<AccordionContent className={`${className} px-4`}>
					{children}
				</AccordionContent>
			</AccordionItem>
		</>
	);
};
