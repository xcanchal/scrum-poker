module.exports = {
  hooks: {
    'pre-commit': 'npm run lint:fix',
    'pre-push': 'npm run depcheck',
  },
};
