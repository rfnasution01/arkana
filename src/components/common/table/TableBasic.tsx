/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
	table: {
		th: any;
		tb: any;
	};
	className?: string;
	thClassName?: string;
	tbClassName?: string;
	isLoading?: boolean;
}

const TableBasic = ({
	className,
	thClassName,
	tbClassName,
	table,
	isLoading,
}: Props) => {
	return (
		<Table className={`rounded-t ${className}`}>
			<TableHeader className={"bg-primary"}>
				<TableRow className={"hover:bg-primary"}>
					{table?.th?.map((row: any, i: number) => (
						<TableHead className={`text-white ${thClassName}`} key={i}>
							{row}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading ? (
					Array.from({ length: 10 }).map((_, i) => (
						<TableRow key={i}>
							{table?.th?.map((_: any, j: number) => (
								<TableCell key={j}>
									<Skeleton className="h-4 w-full" />
								</TableCell>
							))}
						</TableRow>
					))
				) : table?.tb?.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={table.th.length}
							className="text-center text-gray-500 py-4"
						>
							Data belum ada / kosong
						</TableCell>
					</TableRow>
				) : (
					table?.tb?.map((row: any, i: number) => (
						<TableRow key={i}>
							{row.map((row2: any, i2: number) => (
								<TableCell className={tbClassName} key={i2}>
									{row2}
								</TableCell>
							))}
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};

export default TableBasic;
