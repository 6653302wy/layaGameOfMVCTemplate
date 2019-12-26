const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function resolve(name) {
  return path.join(__dirname, "..", name);
}

module.exports = {
  mode: "production",
  devtool: false,
  optimization: {
    minimize: true
  },
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
                target: "es5"
              }
            }
          }
        ]
      },
      {
        test: /\.*(.js)$/,
        // exclude: /node_modules/, // proxy-polyfill不编译 会出现 Uncaught SyntaxError: Unexpected identifier bundle-c9c5c6e0e3.js:1
        // exclude: /node_modules\/(core-js|regenerator-runtime)/, // fix core-js被编译导致各种Symbol找不到的错误
        loader: "babel-loader",
        // 不使用presets Android5.1.1 ios9 测试ok
        // Android5.1 因不支持webGL无法进入游戏
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "entry",
                targets: {
                  browsers: ["> 2%", "last 2 versions", "not ie <= 8"],
                  node: "current"
                },
                corejs: "3"
              }
            ]
          ]
          // plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
          // sourceType: 'unambiguous',
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ]
};
