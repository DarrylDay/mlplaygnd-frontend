"use client";
import Image from "next/image";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Oval, Triangle } from "react-loader-spinner";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [pred, setPred] = useState<string>();
	const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
	const canvasRef = useRef<ReactSketchCanvasRef>(null);

	async function handleCanvasSubmit() {
		clearTimeout(timeoutID);

		if (!canvasRef.current) return;

		const data = await canvasRef.current.exportImage("png");

		const imgRes = await fetch(data);
		const imgBlob = await imgRes.blob();

		const url = process.env.NEXT_PUBLIC_BACKEND_API_URL + "/predict";
		const formData = new FormData();
		formData.append("file", imgBlob);

		setLoading(true);

		const res = await fetch(url, {
			method: "POST",
			body: formData,
			cache: "no-cache",
		});
		const json = await res.json();

		setPred(json.prediction);
		setLoading(false);
	}

	return (
		<main className="w-full h-full flex justify-center">
			<div className="flex flex-col gap-8 w-full max-w-[800px]">
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl font-bold">MNIST</h1>
					<p className="text-justify">
						The MNIST (Modified National Institute of Standards and
						Technology) database is a large collection of 70,000
						grayscale images of handwritten digits, widely used in
						machine learning and computer vision. Each 28x28 pixel
						image, representing digits 0 through 9, is split into a
						training set of 60,000 images and a test set of 10,000
						images. As a standard benchmark, MNIST is essential for
						developing, testing, and comparing image recognition
						algorithms.
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl font-bold">Try it out</h1>
					<p className="text-justify">
						Draw a digit on the black sqaure and see the prediction.
					</p>
					<div className="flex gap-12 items-center justify-center">
						<div className="flex flex-col items-center">
							<div className="w-[200px] h-[200px]">
								<ReactSketchCanvas
									ref={canvasRef}
									canvasColor="black"
									strokeWidth={24}
									strokeColor="white"
									// @ts-ignore
									readOnly={loading}
									onChange={(paths) => {
										if (pred) {
											setPred(undefined);
											canvasRef.current?.clearCanvas();
											canvasRef.current?.loadPaths([
												paths[paths.length - 1],
											]);
										} else if (paths && paths.length > 0) {
											clearTimeout(timeoutID);
											setTimeoutID(
												setTimeout(
													handleCanvasSubmit,
													1000
												)
											);
										}
									}}
								/>
							</div>
							<div className="font-semibold">Input</div>
						</div>
						<div className="flex flex-col items-center">
							<div className="flex flex-col items-center justify-center w-[200px] h-[200px] border-2 border-black">
								{pred ? (
									<div className="text-[128px] font-bold">
										{pred}
									</div>
								) : loading ? (
									<Oval
										width={120}
										height={120}
										color="#000000"
										secondaryColor="#707070"
										ariaLabel="oval-loading"
									/>
								) : (
									<></>
								)}
							</div>
							<div className="font-semibold">Output</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
