const path = require('path');

module.exports = {
  // outras configurações do webpack
  resolve: {
    fallback: { "path": require.resolve("path-browserify") }
  }
};
