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
import { User } from "@supabase/supabase-js";

let init = false;

export default function History() {
	const [user, setUser] = useState<User>();
	const [history, setHistory] = useState<
		Tables<"mnist_predictions">[] | null
	>();

	useEffect(() => {
		async function getHistory() {
			// await new Promise((r) => setTimeout(r, 2000));
			// setHistory([]);
			// return;

			const supabase = createClient();
			const userRes = await supabase.auth.getUser();

			if (userRes.error) {
				setHistory([]);
				toast.error("Could not fetch previous predictions.");
				return;
			}

			setUser(userRes.data.user);

			const { data, error } = await supabase
				.from("mnist_predictions")
				.select("*")
				.order("id", { ascending: false });

			if (error) {
				setHistory([]);
				toast.error("Could not fetch previous predictions.");
				return;
			}

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

			<Table>
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead className="w-[150px] text-center ">
							Input
						</TableHead>
						<TableHead className="text-center">
							Prediction
						</TableHead>
						<TableHead className="text-center">Date</TableHead>
						<TableHead className="w-[100px] text-center ">
							Correct
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{user && history && history.length > 0 ? (
						history.map((x, i) => (
							<TableRow key={i}>
								<TableCell className="font-medium">
									<BucketImage
										key={i}
										bucket={x.img_bucket}
										user_id={user?.id}
										filePath={x.img_filename}
										width={100}
										height={100}
									/>
								</TableCell>
								<TableCell className="text-center text-[64px]">
									{x.prediction}
								</TableCell>
								<TableCell className="text-center">
									{new Date(x.created_at).toLocaleString()}
								</TableCell>
								<TableCell className="w-[100px]">
									<Select
										value={
											x.correct
												? "yes"
												: x.correct != null
												? "no"
												: undefined
										}
									>
										<SelectTrigger className="w-[100px]">
											<SelectValue placeholder="-" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="yes">
												Yes
											</SelectItem>
											<SelectItem value="no">
												No
											</SelectItem>
										</SelectContent>
									</Select>
								</TableCell>
							</TableRow>
						))
					) : history && history.length == 0 ? (
						<TableRow>
							<TableCell
								colSpan={4}
								className="h-24 text-center font-medium"
							>
								No previous predictions
							</TableCell>
						</TableRow>
					) : (
						<>
							<TableRow>
								<TableCell colSpan={4} className="h-24">
									<Skeleton className="h-full w-full" />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell colSpan={4} className="h-24">
									<Skeleton className="h-full w-full" />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell colSpan={4} className="h-24">
									<Skeleton className="h-full w-full" />
								</TableCell>
							</TableRow>
						</>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
