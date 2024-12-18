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
      {source:'/api/:path*',destination:'http://127.0.0.1:8000/:path*'+'/'},
      {source:'/main/api/:path*',destination:'http://127.0.0.1:8000/:path*'+'/'},
    ]
  },
}

module.exports = nextConfig