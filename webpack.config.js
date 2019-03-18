const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); // 导入 在内存中自动生成 index 页面的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/index.html'), // 源文件
    filename: 'index.html' // 生成的内存中首页的名称
});
//压缩工具
const UglifyPlugin = new UglifyJsPlugin({
    uglifyOptions: {
        comments: false,
        compress: {
            warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
        }
    }
});

// 向外暴露一个打包的配置对象；   因为 webpack 是基于Node构建的；所以 webpack 支持所有Node API 和语法
// webpack 默认只能打包处理 .js 后缀名类型的文件； 像 .png .vue 无法主动处理，所以要配置第三方的loader；
module.exports = {
    /*entry: ['babel-polyfill', './src/app.js'],*/
    mode: 'production', // development   production
    // 在 webpack 4.x 中，有一个很大的特性，就是 约定大于配置  约定，默认的打包入口路径是 src -> index.js
    plugins: [
        htmlPlugin,
        new ExtractTextPlugin("bundle.css"),
    ],
    module: { // 所有第三方 模块的配置规则
        rules: [ // 第三方匹配规则
            {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/}, // 千万别忘记添加 exclude 排除项
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    autoprefixer({
                                        browsers: [
                                            "> 1%",
                                            "last 2 versions"
                                        ]
                                    })
                                ]
                            }
                        }],
                    publicPath: "../"
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 表示，这几个文件的后缀名，可以省略不写
        alias: { // 表示别名
            '@': path.join(__dirname, './src') // 这样，@ 就表示 项目根目录中 src 的这一层路径
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash:8].js',
        publicPath: '/',
    },
    optimization: {
        minimizer: [
            UglifyPlugin
        ],
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }
};
/*asset:  '[path].gz[query]',
    algorithm:  'gzip',
    test:  /\.js$|\.css$|\.html$/*/

