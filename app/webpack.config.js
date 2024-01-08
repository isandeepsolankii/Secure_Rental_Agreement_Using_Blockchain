const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
    new CopyWebpackPlugin([{ from: "./src/styles/styles.css", to: "styles/styles.css" }]),
    new CopyWebpackPlugin([{ from: "./src/styles/bootstrap.css", to: "styles/bootstrap.css" }]),
    new CopyWebpackPlugin([{ from: "./src/Html/landlord.html", to: "Html/landlord.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Html/Payment.html", to: "Html/Payment.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Html/GetDetails.html", to: "Html/GetDetails.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Html/Register.html", to: "Html/Register.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Html/Validate.html", to: "Html/Validate.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Html/tenant.html", to: "Html/tenant.html" }]),
    new CopyWebpackPlugin([{ from: "./src/images/Landlordimg.jpg", to: "images/Landlordimg.jpg" }]),
    new CopyWebpackPlugin([{ from: "./src/images/Tenantimg.jpg", to: "images/Tenantimg.jpg" }]),
    new CopyWebpackPlugin([{ from: "./src/images/Contract.jpg", to: "images/Contract.jpg" }]),
    new CopyWebpackPlugin([{ from: "./src/images/house.png", to: "images/house.png" }]),
    new CopyWebpackPlugin([{ from: "./src/images/favicon.ico", to: "images/favicon.ico" }]),

  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
