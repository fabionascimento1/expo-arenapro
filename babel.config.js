module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ".",
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".andoid.js",
            ".ios.js",
            ".android.tsx",
            ".ios.tsx",
          ],
        },
      ],
    ],
  };
};
