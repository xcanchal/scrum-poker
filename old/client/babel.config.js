module.exports = {
  presets: [
    ['@babel/env', { useBuiltIns: 'entry', corejs: 3 }],
    ['@babel/preset-react']
  ],
  plugins: [
    ['babel-plugin-styled-components', { displayName: false }],
  ]
};