"use client";
import {
	Bell,
	ChevronDown,
	Cog,
	FileDigit,
	FlaskConical,
	Home,
	LifeBuoy,
	LogOut,
	MicVocal,
	Package2,
	Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import UserDropdown from "../UserDropdown";
import NavLink from "./NavLink";
import { User } from "@supabase/supabase-js";

export default function NavBar({ user }: { user: User }) {
	const pathname = usePathname();

	return (
		<div className="flex h-full max-h-screen flex-col gap-2">
			<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<Link
					href="/"
					className="flex items-center gap-2 font-semibold"
				>
					<FlaskConical width={20} />
					<span className="">ML PlayGND</span>
				</Link>
				<div className="ml-auto">
					<UserDropdown email={user.email} />
				</div>
			</div>
			<div className="flex-1">
				<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
					<NavLink
						href="/experiment/mnist"
						title="MNIST"
						icon={<FileDigit className="w-4 h-4" />}
					/>
				</nav>
			</div>
		</div>
	);
}
