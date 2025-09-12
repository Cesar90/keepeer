import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev, paths } = options;

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    };

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const urlLoader = {
        test: /\.(jpg|png|jpeg)$/,
        use: {
            loader: 'url-loader',
        },
    };

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });
    const cssLoader = buildCssLoader(options);
    // const cssLoader = {
    //     test: /\.css$/i,
    //     include: paths.tailwind,
    //     use: ['style-loader', 'css-loader', 'postcss-loader'],
    // }

    return [
        // babelLoader,
        // typescriptLoader,

        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader,
        urlLoader,
    ];
}
