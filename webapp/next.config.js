/** @type {import('next').NextConfig} */

require("dotenv").config();

const basePath = "";

module.exports = {
	/*async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true
			}
		]
	},*/
	reactStrictMode: true,
	env: {
		basePath: basePath,
		img: `${basePath}/img`,
		api: `${process.env.NODE_HOST}${process.env.NODE_PORT ? `:${process.env.NODE_PORT}` : ""}`,
		socket: `${process.env.NODE_HOST}${process.env.NODE_PORT ? `:${process.env.NODE_PORT}` : ""}`,
		title: "Pedala Manaus",
		googleClientId: process.env.GOOGLE_CLIENT_ID,
		mapsApiKey: process.env.MAPS_API_KEY
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};
