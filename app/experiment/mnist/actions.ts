"use server";

import { Tables } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";

export async function getHistory() {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("mnist_predictions")
		.select("*");

	console.log(data);
}
