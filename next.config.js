module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?/,
      use: ["@compiled/webpack-loader"],
    });

    return config;
  },
};
