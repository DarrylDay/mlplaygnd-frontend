import Demo from "@/components/mnist/Demo";
import History from "@/components/mnist/History";

export default function Home() {
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
				<Demo />
				<History />
			</div>
		</main>
	);
}
