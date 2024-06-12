"use client";
import { Tables } from "@/lib/schema";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import BucketImage from "../BucketImage";
import { Session, User } from "@supabase/supabase-js";
import { DataTablePagination } from "../common/table/DataTablePagination";
import { DataTable, useDataTable } from "../common/table/DataTable";
import { getColumns } from "./HistoryTableColumns";
import { useWindowDimensions } from "@/lib/useWindowDimensions";
import HistoryTableResize from "./HistoryTableResize";

let init = false;

export default function History() {
	const [session, setSession] = useState<Session>();
	const [history, setHistory] = useState<
		Tables<"mnist_predictions">[] | null
	>();

	async function updateCorrect(
		correct: boolean,
		pred: Tables<"mnist_predictions">
	) {
		const supabase = createClient();
		const { error } = await supabase
			.from("mnist_predictions")
			.update({ correct: correct })
			.eq("id", pred.id);

		if (error) {
			toast.error("Correction could not be updated.");
			console.log(error);
			return;
		}

		setHistory(
			history?.map((x) => {
				if (x.id == pred.id) return { ...pred, correct: correct };
				else return x;
			})
		);
	}

	const table = useDataTable<Tables<"mnist_predictions">>({
		columns: getColumns(updateCorrect, session),
		data: history ?? [],
	});

	useEffect(() => {
		table.setPageSize(5);
		async function getHistory() {
			console.log("get history");
			const supabase = createClient();
			const sessionRes = await supabase.auth.getSession();

			if (sessionRes.error || !sessionRes.data.session) {
				setHistory([]);
				toast.error("Could not fetch previous predictions.");
				return;
			}

			setSession(sessionRes.data.session);

			const { data, error } = await supabase
				.from("mnist_predictions")
				.select("*")
				.order("id", { ascending: false });

			if (error) {
				setHistory([]);
				toast.error("Could not fetch previous predictions.");
				return;
			}
			console.log("set history");
			setHistory(data);
		}

		if (!init) {
			init = true;
			getHistory();
		}
	}, []);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-4xl font-bold">History</h1>

			<DataTable table={table} />
			<DataTablePagination table={table} />
			<HistoryTableResize table={table} />
		</div>
	);
}
