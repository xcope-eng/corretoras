/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: '/corretoras', // Updated to match your repository name
  images: {
    domains: ['picsum.photos'],
    unoptimized: true, // Required for static export
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
          chunkFilename: 'static/css/[id].[contenthash].css',
        })
      );
    }
    return config;
  },
}

module.exports = nextConfig 