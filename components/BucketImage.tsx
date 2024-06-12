"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function BucketImage({
	bucket,
	filePath,
	width,
	height,
}: {
	bucket: string | null;
	filePath: string | null;
	width: number;
	height: number;
}) {
	const [src, setSrc] = useState<string>("");

	useEffect(() => {
		console.log(filePath);

		async function getImage() {
			if (!bucket || !filePath) return;

			const supabase = createClient();
			const userRes = await supabase.auth.getSession();
			const user_id = userRes.data.session?.user.id;

			if (!user_id) {
				console.log("Unable to get user details");
				return;
			}

			const { data, error } = await supabase.storage
				.from(bucket)
				.download(user_id + "/" + filePath);

			if (error) {
				console.log(error);
				return;
			}

			const img = URL.createObjectURL(data);
			setSrc(img);
		}

		if (!bucket || !filePath) return;

		getImage();
	}, []);

	return (
		<>
			{src != "" ? (
				<img
					src={src}
					width={width}
					height={height}
					alt={"bucket image"}
				/>
			) : (
				<Skeleton style={{ width: width, height: height }} />
			)}
		</>
	);
}
