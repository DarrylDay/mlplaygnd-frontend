/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/experiment/mnist",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
