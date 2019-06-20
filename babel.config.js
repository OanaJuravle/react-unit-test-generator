module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      'transform-es2015-modules-commonjs',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      'dynamic-import-webpack',
    ],
    presets: ['@babel/env', '@babel/preset-react'],
  };
};
