"use client";
import Image from "next/image";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [pred, setPred] = useState<string>();
	const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
	const canvasRef = useRef<ReactSketchCanvasRef>(null);

	async function handleCanvasSubmit() {
		clearTimeout(timeoutID);
		console.log("Submit");

		if (!canvasRef.current) return;

		const data = await canvasRef.current.exportImage("png");

		const imgRes = await fetch(data);
		const imgBlob = await imgRes.blob();

		const url = process.env.NEXT_PUBLIC_BACKEND_API_URL + "/predict";
		const formData = new FormData();
		formData.append("file", imgBlob);
		const res = await fetch(url, {
			method: "POST",
			body: formData,
			cache: "no-cache",
		});

		const json = await res.json();

		console.log(json);

		setPred(json.prediction);
	}

	return (
		<main className="w-full h-full flex justify-center">
			<div className="flex flex-col gap-2 w-full max-w-[500px] items-center justify-center">
				<div className="w-[200px] h-[200px]">
					<ReactSketchCanvas
						ref={canvasRef}
						canvasColor="black"
						strokeWidth={24}
						strokeColor="white"
						onChange={(paths) => {
							//console.log("stroke");
							if (paths.length > 0) {
								clearTimeout(timeoutID);
								setTimeoutID(
									setTimeout(handleCanvasSubmit, 1000)
								);
							}
						}}
					/>
				</div>
				<Button
					onClick={() => {
						canvasRef.current?.clearCanvas();
						setPred(undefined);
						clearTimeout(timeoutID);
					}}
				>
					Reset
				</Button>
				{/* <Button
					onClick={() => {
						canvasRef.current
							?.exportImage("png")
							.then((data) => {
								console.log(data);
							})
							.catch(console.log);
					}}
				>
					Export
				</Button> */}
				<Button onClick={handleCanvasSubmit}>Send</Button>

				{pred ? <div>{pred}</div> : <></>}
			</div>
		</main>
	);
}
