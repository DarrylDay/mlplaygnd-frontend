import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export default function BucketImageProxy({
	bucket,
	token,
	filePath,
	width,
	height,
}: {
	bucket: string | null;
	token?: string;
	filePath: string | null;
	width: number;
	height: number;
}) {
	return (
		<>
			{bucket && token && filePath ? (
				<Image
					src={`${
						process.env.NEXT_PUBLIC_BACKEND_API_URL
					}/getBucketImage?bucket=${encodeURIComponent(
						bucket
					)}&file=${encodeURIComponent(
						filePath
					)}&token=${encodeURIComponent(token)}`}
					width={width}
					height={height}
					alt="bucket-image"
				/>
			) : (
				<Skeleton style={{ width: width, height: height }} />
			)}
		</>
	);
}
