module.exports = {
  // The entry point for our application
  entry: './src/index.js',
  // The directory and filename for our bundled javascript
  output: {
    path: './dist',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },

  devServer: {
    contentBase: 'public',
    publicPath: '/assets/',
  }

};
