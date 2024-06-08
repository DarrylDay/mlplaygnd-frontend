"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({
	href,
	title,
	icon,
}: {
	href: string;
	title: string;
	icon: React.ReactNode;
}) {
	const pathname = usePathname();
	return (
		<Link
			href={href}
			className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
				pathname == href ? "bg-muted" : ""
			}`}
		>
			{icon}
			{title}
		</Link>
	);
}
