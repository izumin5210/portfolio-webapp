module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    // linaria
    config.module.rules.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      exclude: /node_modules/,
      use: [{ loader: "@linaria/webpack-loader" }],
    });

    return config;
  },
};
