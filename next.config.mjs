/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cardapioplus-profile.s3.us-east-2.amazonaws.com"],
    unoptimized: true
  }
};

export default nextConfig;
