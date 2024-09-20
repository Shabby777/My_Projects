// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Process .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules folder
        use: {
          loader: 'babel-loader', // Use Babel loader
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow importing JS and JSX files without extensions
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve content from 'dist' directory
    compress: true,
    port: 3000, // Dev server port
  },
  mode: 'development',
};
