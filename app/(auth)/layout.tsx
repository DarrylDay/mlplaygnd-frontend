import { requireNoUser } from "@/lib/supabase/server";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireNoUser();

	return (
		<>
			<div className="w-screen h-screen p-6 flex flex-col justify-center">
				{children}
			</div>
		</>
	);
}
