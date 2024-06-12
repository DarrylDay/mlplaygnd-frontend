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
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "5000",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api.mlplaygnd.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
