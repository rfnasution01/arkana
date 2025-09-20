/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps {
	columns: any;
	data: any;
	showNoResult?: boolean;
	addRow?: ReactNode;
	thClassName?: string;
	tdClassName?: string;
	loading?: boolean;
}

export function TableCustom({
	columns,
	data,
	showNoResult = true,
	addRow,
	tdClassName,
	thClassName,
	loading,
}: DataTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="overflow-hidden rounded-md border-0">
			<Table className="border-none border-0">
				<TableHeader className="border-none">
					{table?.getHeaderGroups()?.map((headerGroup, k) => (
						<TableRow className="border-none" key={k}>
							{headerGroup?.headers?.map((header, j) => {
								return (
									<TableHead
										className={`bg-[#EBF6FF] text-independence ${
											thClassName ?? ""
										}`}
										key={j}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table?.getRowModel()?.rows?.length
						? table?.getRowModel()?.rows?.map((row, k) => (
								<TableRow
									key={k}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells()?.map((cell, j) => (
										<TableCell
											className={`py-4 text-independence align-top text-wrap ${
												tdClassName ?? ""
											}`}
											key={j}
										>
											{loading ? (
												<Skeleton className="bg-gray-300 h-[20px]" />
											) : (
												flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)
											)}
										</TableCell>
									))}
								</TableRow>
						  ))
						: showNoResult && (
								<TableRow>
									<TableCell
										colSpan={columns?.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
						  )}
					{addRow}
				</TableBody>
			</Table>
		</div>
	);
}
