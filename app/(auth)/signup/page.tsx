"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSubmitButton from "@/components/FormSubmitButton";
import { signup } from "@/app/auth-actions";
import { useFormState } from "react-dom";

const initialState = {
	message: "",
};

export default function SignUpPage() {
	const [state, formAction] = useFormState(signup, initialState);

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="grid gap-4" action={formAction}>
					{/* <div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name">First name</Label>
							<Input id="first-name" placeholder="Max" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								id="last-name"
								placeholder="Robinson"
								required
							/>
						</div>
					</div> */}
					<div className="grid gap-2">
						{state.message != "" ? (
							<p className=" text-destructive">{state.message}</p>
						) : (
							<></>
						)}
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="me@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" name="password" />
					</div>
					<FormSubmitButton label="Create an account" />
					{/* <Button variant="outline" className="w-full">
						Sign up with GitHub
					</Button> */}
				</form>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/login" className="underline">
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
