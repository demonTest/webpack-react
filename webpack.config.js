const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); // 导入 在内存中自动生成 index 页面的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
const extractTextPlugin = new ExtractTextPlugin({
    filename: "[name].min.css",
    allChunks: false
});
const miniCssExtractPlugin =   new MiniCssExtractPlugin({
    filename: "scss/[name].[hash:8].css",
});
/*?modules&localIdentName=[path][name]-[local]-[hash:5]'*/
// 向外暴露一个打包的配置对象；   因为 webpack 是基于Node构建的；所以 webpack 支持所有Node API 和语法
// webpack 默认只能打包处理 .js 后缀名类型的文件； 像 .png .vue 无法主动处理，所以要配置第三方的loader；
module.exports = {

    entry:'./src/index.js', // 入口,
    mode: 'development', // development   production
    // 在 webpack 4.x 中，有一个很大的特性，就是 约定大于配置  约定，默认的打包入口路径是 src -> index.js
    devtool: "source-map", // 开启调试
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8000, // 本地服务器端口号
        hot: true, // 热重载
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
            // 跨域代理转发
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {"^/api": "/api"} // 将/api重写为""空字符串
            },
            historyApiFallback: {
                // HTML5 history模式
                rewrites: [{from: /.*/, to: "/index.html"}]
            }
        }
    },
    plugins: [
        htmlPlugin
    ],
    module: { // 所有第三方 模块的配置规则
        rules: [ // 第三方匹配规则
            {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/}, // 千万别忘记添加 exclude 排除项
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },{
               test:/\.ttf|woff|woff2|eot|svg$/,
                use: "url-loader"
            },
            {
                test:/\.scss$/, use: ['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','sass-loader']
            },
            {
                test:/\.(jpg|png|gif|svg|bmp)$/,
                use:'url-loader?limit=1024&name=[name].[hash:5].[ext]&outputPath=images/&publicPath=/images',
                include:path.join(__dirname,'./src'),
                exclude:/node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.vue'], // 表示，这几个文件的后缀名，可以省略不写
        alias: { // 表示别名
            '@': path.join(__dirname, './src') // 这样，@ 就表示 项目根目录中 src 的这一层路径
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        publicPath: './',
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
    test:  /\.js$|\.scss$|\.html$/*/
