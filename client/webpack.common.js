const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const styleLintFormatter = require('stylelint-formatter-pretty');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  resolveLoader: {
    moduleExtensions: ['*-loader', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Room book',
      template: `${__dirname}/src/index.html`
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: ['**/*.scss'],
      formatter: styleLintFormatter
    })
  ]
};
