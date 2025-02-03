const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development',
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src', 'api'),
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@utils': path.resolve(__dirname, 'src', 'utils'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@constants': path.resolve(__dirname, 'src', 'constants'),
        '@sass': path.resolve(__dirname, 'src', 'sass'),
        '@modules': path.resolve(__dirname, 'src', 'modules'),
        '@node_modules': path.resolve(__dirname, 'node_modules'),
        '@config': path.resolve(__dirname, 'src', 'config'),
      },
      extensions: ['', '.js', '.jsx', '.scss'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/icons/favicon.ico',
      }),
      ...(env.mode === 'production'
        ? [
            new GenerateSW({
              clientsClaim: true,
              skipWaiting: true,
              cleanupOutdatedCaches: true,
            }),
            new CopyWebpackPlugin({
              patterns: [
                { from: 'public/manifest.json', to: '' },
                { from: 'public/icons/icon-192x192.png', to: '' },
                { from: 'public/icons/icon-512x512.png', to: '' },
              ],
            }),
          ]
        : []),
    ],
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      hot: true,
      historyApiFallback: true,
    },
  };
};
