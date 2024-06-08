import { FileDigit, FlaskConical } from "lucide-react";
import Link from "next/link";
import React from "react";
import UserDropdown from "../UserDropdown";
import NavLink from "./NavLink";
import { User } from "@supabase/supabase-js";
import Logo from "../Logo";

export default function NavBar({ user }: { user: User }) {
	return (
		<div className="flex h-full max-h-screen flex-col gap-2">
			<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<Logo />
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
