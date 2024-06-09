"use client";
import { Tables } from "@/lib/schema";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

let init = false;

export default function History() {
	const [history, setHistory] = useState<
		Tables<"mnist_predictions">[] | null
	>();

	useEffect(() => {
		async function getHistory() {
			const supabase = createClient();
			const { data, error } = await supabase
				.from("mnist_predictions")
				.select("*");

			setHistory(data);
			// console.log(data);
		}

		if (!init) {
			init = true;
			getHistory();
		}
	}, []);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-4xl font-bold">History</h1>
			{history?.map((x, i) => (
				<div key={i}>{x.prediction}</div>
			))}
		</div>
	);
}
