"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { DataTableColumnHeader } from "../common/table/DataTableColumnHeader";
import { Tables } from "@/lib/schema";
import BucketImage from "../BucketImage";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Session, User } from "@supabase/supabase-js";
import BucketImageProxy from "../BucketImageProxy";

export const getColumns: (
	updateCorrect: (
		correct: boolean,
		pred: Tables<"mnist_predictions">
	) => void,
	session?: Session
) => ColumnDef<Tables<"mnist_predictions">>[] = (updateCorrect, session) => [
	{
		id: "image",
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-[150px] text-center"
				column={column}
				title="Input"
			/>
		),
		cell: ({ row }) => (
			<div key={row.id} className="max-w-[150px] flex justify-center">
				{/* <BucketImage
					bucket={row.original.img_bucket}
					filePath={row.original.img_filename}
					width={100}
					height={100}
				/> */}
				<BucketImageProxy
					bucket={row.original.img_bucket}
					filePath={row.original.img_filename}
					token={session?.access_token}
					width={100}
					height={100}
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "prediction",
		header: ({ column }) => (
			<DataTableColumnHeader
				className="text-center"
				column={column}
				title="Prediction"
			/>
		),
		cell: ({ row }) => (
			<div className="text-center text-[48px] sm:text-[64px]">
				{row.getValue("prediction")}
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "date",
		header: ({ column }) => (
			<DataTableColumnHeader
				className="text-center"
				column={column}
				title="Date"
			/>
		),
		cell: ({ row }) => (
			<div className="text-center text-wrap">
				{new Date(row.original.created_at).toLocaleString()}
			</div>
		),
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: "correct",
		header: ({ column }) => (
			<DataTableColumnHeader
				className="text-center"
				column={column}
				title="Correct"
			/>
		),
		cell: ({ row }) => (
			<div className="text-center">
				<Select
					value={
						row.original.correct
							? "yes"
							: row.original.correct != null
							? "no"
							: undefined
					}
					onValueChange={(v) => {
						updateCorrect(v == "yes", row.original);
					}}
				>
					<SelectTrigger className="w-[80px] sm:w-[100px]">
						<SelectValue placeholder="-" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="yes">Yes</SelectItem>
						<SelectItem value="no">No</SelectItem>
					</SelectContent>
				</Select>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
];
