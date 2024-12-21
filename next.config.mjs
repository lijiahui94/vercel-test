/** @type {import('next').NextConfig} */
let path = process.env.NEXT_PUBLIC_NODE_ENV == "test" ? "/test" : "";
const nextConfig = {
  // basePath: path,
  // assetPrefix: path,
  output: "export",
  reactStrictMode: false,
};

export default nextConfig;
