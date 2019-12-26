module.exports = {
    devServer:{
        open:true,
        host:"127.0.0.1",
        port:9000,
        // 服务端代理
        proxy:{
            // /ele 是当你请求的地址当中以/ele开头会使用该代理
            
            "/ele":{
                // 指定你要代理的服务器
                target:"http://127.0.0.1",
                changeOrigin:true, //是否开启代理
                // 将你的地址进行重写
                pathRewrite:{
                    "^/ele":"", //将/ele 替换为空 （去除/ele）
                }
            }
        }
    }
}