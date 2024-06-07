import React, { useState } from "react";
import { Button } from "../ui/button";

export default function FileUpload() {
	const [file, setFile] = useState<File>();

	async function handleFileSubmit(event: any) {
		event.preventDefault();

		if (!file) return;

		console.log("Submit");

		const url = "http://127.0.0.1:5000/predict";
		const formData = new FormData();
		formData.append("file", file);
		const res = await fetch(url, {
			method: "POST",
			body: formData,
			cache: "no-cache",
		});

		const json = await res.json();

		console.log(json);
	}

	return (
		<form onSubmit={handleFileSubmit}>
			<div>Select Image</div>
			<input
				type="file"
				onChange={(e) =>
					setFile(e.target.files ? e.target.files[0] : undefined)
				}
			/>
			<Button type="submit">Submit</Button>
		</form>
	);
}
