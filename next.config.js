/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  images : {
    domains : ['blog-app-u6rn.onrender.com',
                'res.cloudinary.com',
                '127.0.0.1'    
  ],
  }
}

module.exports = nextConfig

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   optimizeFonts: true,
//   env: {
//     API_BASE_URL:
//       process.env.API_BASE_URL,
//     API_CLOUD_URL :
//       process.env.API_CLOUD_URL,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'blog-app-u6rn.onrender.com',
//         port: '',
//         pathname: '/image/upload/**',
//       },
//       {
//           protocol: 'https',
//           hostname: 'res.cloudinary.com',
//         },

//     ],
//     minimumCacheTTL: 1500000,
//   },
// };

// module.exports = nextConfig;

   // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'blog-app-u6rn.onrender.com',
      // },