import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import HTMLWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths, isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const isProd = !isDev;
    const plugins = [
        new webpack.ProgressPlugin(),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        // plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerHost: '0.0.0.0',
        }));
        plugins.push(new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery', // <------------------ added this
        }));
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[ontenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
    }

    return plugins;
}
