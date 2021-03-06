const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            //target: 'http://ec2-13-124-81-49.ap-northeast-2.compute.amazonaws.com:5000',
            changeOrigin: true
        })

    )
}