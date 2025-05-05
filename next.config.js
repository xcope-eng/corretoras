/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Removed: Let Vercel handle standard build unless static export is required
  // basePath: '/corretoras', // Keep basePath, may need Vercel config
  images: {
    domains: ['picsum.photos'],
    // unoptimized: true, // Removed: Not needed for standard build
  },
  // webpack: (config, { isServer }) => { // Removed: Custom MiniCssExtractPlugin likely unnecessary
  //   if (!isServer) {
  //     config.plugins.push(
  //       new MiniCssExtractPlugin({
  //         filename: 'static/css/[name].[contenthash].css',
  //         chunkFilename: 'static/css/[id].[contenthash].css',
  //       })
  //     );
  //   }
  //   return config;
  // },
}

module.exports = nextConfig
