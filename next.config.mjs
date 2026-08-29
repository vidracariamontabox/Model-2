import path from "node:path";
import webpack from "next/dist/compiled/webpack/webpack-lib.js";

const nextConfig = {
  productionBrowserSourceMaps: true,
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-module\.js$/,
          path.resolve("empty-polyfill.js"),
        ),
      );
    }
    return config;
  },
};

export default nextConfig;
