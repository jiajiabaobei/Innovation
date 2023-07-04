module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
        host: 'localhost',
        port: 10086,
        proxy: {
            'calculate_expense': {//接口访问路径
                target: 'http://127.0.0.1:5000',  // 服务端域名
                changeOrigin: true
            }
        }
    },
  }
}
