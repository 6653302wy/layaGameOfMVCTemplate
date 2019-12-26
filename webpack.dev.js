const path = require("path");
// const CleanWebpackPlugin = require("clean-webpack-plugin");

function resolve(name) {
  return path.join(__dirname, "..", name);
}

module.exports = {
  devtool: "source-map", // 打包出的js文件是否生成map文件（方便浏览器调试）
  mode: "development",
  watch: true,
  entry: {
    bundle: [resolve("PureCore/src/Main.ts")]
  },
  output: {
    filename: "bundle.js", // 生成的fiename需要与package.json中的main一致
    path: resolve("PureCore/bin/js/")
  },
  resolve: {
    extensions: [".js", ".ts", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                target: "es6"
              }
            }
          }
        ]
      }
    ]
  }
  // plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)],
};
