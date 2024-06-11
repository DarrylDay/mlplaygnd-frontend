"use server";
import Logo from "@/components/Logo";
import UserDropdown from "@/components/UserDropdown";
import NavBar from "@/components/nav/NavBar";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { requireUser } from "@/lib/supabase/server";
import { Menu } from "lucide-react";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = await requireUser();

	return (
		<>
			<div className="md:grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="hidden border-r bg-muted/40 md:block">
					<NavBar user={user} />
				</div>
				<div className="flex flex-col w-full">
					<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<Sheet>
							<SheetTrigger asChild>
								<div className="flex gap-4 shrink-0 md:hidden">
									<Button variant="outline" size="icon">
										<Menu className="h-5 w-5" />
										<span className="sr-only">
											Toggle navigation menu
										</span>
									</Button>
									<Logo />
								</div>
							</SheetTrigger>
							<SheetContent side="left" className="flex flex-col">
								<NavBar user={user} />
							</SheetContent>
						</Sheet>
						<div className="w-full flex-1"></div>
						<UserDropdown email={user.email} />
					</header>
					<ScrollArea className="h-[calc(100vh-60px)]">
						<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
							{children}
						</main>
					</ScrollArea>
				</div>
			</div>
		</>
	);
}
