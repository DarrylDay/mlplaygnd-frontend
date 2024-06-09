"use client";
import { createClient } from "@/lib/supabase/client";
import React, { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "../ui/button";
import { Tables } from "@/lib/schema";

export default function Demo() {
	const [loading, setLoading] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [pred, setPred] = useState<Tables<"mnist_predictions">>();
	const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
	const canvasRef = useRef<ReactSketchCanvasRef>(null);

	async function handleCanvasSubmit() {
		clearTimeout(timeoutID);

		if (!canvasRef.current) return;

		const imgData = await canvasRef.current.exportImage("png");

		const imgRes = await fetch(imgData);
		const imgBlob = await imgRes.blob();

		const url = process.env.NEXT_PUBLIC_BACKEND_API_URL + "/predict";
		const formData = new FormData();
		formData.append("file", imgBlob);

		setLoading(true);

		const supabase = createClient();
		const { data, error } = await supabase.auth.getSession();

		const res = await fetch(url, {
			method: "POST",
			body: formData,
			cache: "no-cache",
			headers: {
				Authorization: "Bearer " + data.session?.access_token,
			},
		});
		const json = await res.json();
		console.log(json);

		setShowConfirmation(true);
		setPred(json);
		setLoading(false);
	}

	async function setCorrect(correct: boolean) {
		if (!pred || (pred.correct != null && pred.correct == correct)) return;

		const supabase = createClient();
		const { error } = await supabase
			.from("mnist_predictions")
			.update({ correct: correct })
			.eq("id", pred.id);

		if (error) {
			console.log(error);
			return;
		}

		console.log("Set correct = " + correct);
		setPred({
			...pred,
			correct: correct,
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-4xl font-bold">Try it out</h1>
			<p className="text-justify">
				Draw a digit on the black sqaure and see the prediction.
			</p>
			<div className="flex gap-4 min-[480px]:gap-12 flex-wrap items-center justify-center">
				<div className="text-center">
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
										setTimeout(handleCanvasSubmit, 1000)
									);
								}
							}}
						/>
					</div>
					<div className="font-semibold">Input</div>
				</div>
				<div className="text-center">
					<div className="flex flex-col items-center justify-center w-[200px] h-[200px] border-2 border-black">
						{pred ? (
							<div className="text-[128px] font-bold">
								{pred.prediction}
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
			{showConfirmation ? (
				<div className="flex gap-4 items-center justify-center mt-2">
					<p>Correct?</p>
					<Button
						variant={"outline"}
						className={pred?.correct ? "bg-green-400" : ""}
						onClick={() => setCorrect(true)}
					>
						👍
					</Button>
					<Button
						variant={"outline"}
						className={
							pred != undefined &&
							pred.correct != null &&
							!pred.correct
								? "bg-red-400"
								: ""
						}
						onClick={() => setCorrect(false)}
					>
						👎
					</Button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
