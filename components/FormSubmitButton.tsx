"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FormSubmitButton({ label }: { label: string }) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="w-full" disabled={pending}>
			{label}
		</Button>
	);
}
