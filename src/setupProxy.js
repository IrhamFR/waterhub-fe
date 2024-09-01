const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://18.140.179.71:1337',
            changeOrigin: true,
        })
    );
};