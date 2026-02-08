const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  mode: "development",
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:3001/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote1",
      filename: "remoteEntry.js",
      remotes: {
        sharedUI: `promise new Promise(resolve => {
          // This requires the host to be module-capable or use a script tag
          // But since Vite outputs ESM, we use import()
          import("http://localhost:3020/sharedUI/remoteEntry.js").then(remote => {
            resolve(remote)
          })
        })`
      },
      exposes: {
        "./Widget": "./src/Widget",
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
