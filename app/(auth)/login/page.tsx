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
import { login } from "@/app/auth-actions";
import { useFormState } from "react-dom";
import FormSubmitButton from "@/components/FormSubmitButton";

const initialState = {
	message: "",
};

export default function LoginPage() {
	const [state, formAction] = useFormState(login, initialState);

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="grid gap-4" action={formAction}>
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
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							{/* <Link
								href="#"
								className="ml-auto inline-block text-sm underline"
							>
								Forgot your password?
							</Link> */}
						</div>
						<Input
							id="password"
							type="password"
							name="password"
							required
						/>
					</div>
					<FormSubmitButton label="Login" />
					{/* <Button variant="outline" className="w-full">
						Login with Google
					</Button> */}
				</form>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
