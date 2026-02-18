const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    // clean: {
    //   dry: true,
    //   keep: /\.css$/,
    // }
  },
  mode: 'development',
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // resource // inline //asset
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3KB // if below inline or resource
          }
        }
      },
      {
        test: /\.txt$/i,
        type: 'asset/source',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['sass-loader', 'style-loader', 'css-loader'],
        // use: [MiniCssExtractPlugin.loader, 'sass-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          }
        }
      },
      {
        test: /\.hbs$/i,
        use: ['handlebars-loader'],
      }
    ]
  },
  plugins: [
      new TerserPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: 'styles.[contenthash].css',
      // }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          '**/*',
          path.join(process.cwd(), 'dist/**/*'),
        ],
      }),
      new HtmlWebpackPlugin({
        template: './src/index.hbs',
        title: "Hello, I am from webpack",
        description: "This is a custom description for the handlebars HTML file.",
        // meta: {
        //   description: 'This is a custom description for the generated HTML file.'
        // }
      }),
    ]
};
