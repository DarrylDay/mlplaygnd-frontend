"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function BucketImage({
	bucket,
	user_id,
	filePath,
	width,
	height,
}: {
	bucket: string | null;
	user_id: string | null;
	filePath: string | null;
	width: number;
	height: number;
}) {
	const [src, setSrc] = useState<string>("");

	useEffect(() => {
		async function getImage() {
			if (!bucket || !filePath) return;

			const supabase = createClient();

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
	}, [bucket, filePath]);

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
