module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./app/assets",
            app: "./app",
            js: "./app/js",
          },
        },
      ],
    ],
  };
};
