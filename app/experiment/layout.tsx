import NavBar from "@/components/nav/NavBar";
import { requireUser } from "@/lib/supabase/server";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = await requireUser();

	return (
		<>
			<div className="fixed hidden md:block w-[220px] lg:w-[260px] h-screen border-r bg-muted/40">
				<NavBar user={user} />
			</div>
			<div className="md:ml-[220px] lg:ml-[260px] h-screen p-6">
				{children}
			</div>
		</>
	);
}
