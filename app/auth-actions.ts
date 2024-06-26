"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(prevState: any, formData: FormData) {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return {
			message: error.message,
		};
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signup(prevState: any, formData: FormData) {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		return {
			message: error.message,
		};
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function logout() {
	const supabase = createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		return {
			message: error.message,
		};
	}

	revalidatePath("/", "layout");
	redirect("/");
}
