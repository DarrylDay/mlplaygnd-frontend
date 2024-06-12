import { useWindowDimensions } from "@/lib/useWindowDimensions";
import { Table } from "@tanstack/react-table";
import React, { useEffect } from "react";

export default function HistoryTableResize<TData>({
	table,
}: {
	table: Table<TData>;
}) {
	const { height, width } = useWindowDimensions();

	useEffect(() => {
		if (width < 500) {
			table.getColumn("date")?.toggleVisibility(false);
			//table.getColumn("correct")?.toggleVisibility(false);
		} else {
			table.getColumn("date")?.toggleVisibility(true);
			//table.getColumn("correct")?.toggleVisibility(true);
		}
	}, [width, table]);

	return <></>;
}
