/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // Note: This feature is required to use NextJS Image in SSG mode.
  // 请参见 https://nextjs.org/docs/messages/export-image-api 来了解不同的解决方法。
  images: {
    unoptimized: true,
  },
  async rewrites(){
    return [
      {source:'/api/:path*',destination:'http://localhost:8000/:path*'+'/'}
    ]
  },
}

module.exports = nextConfig