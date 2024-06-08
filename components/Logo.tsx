import { FlaskConical } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2 font-semibold">
			<FlaskConical width={20} />
			<span className="">ML PlayGND</span>
		</Link>
	);
}
