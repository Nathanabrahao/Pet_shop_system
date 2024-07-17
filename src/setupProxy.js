const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pethub-hml.cgtecnologia.com.br',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};
