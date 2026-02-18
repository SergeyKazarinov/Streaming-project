/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  'backend/**/*.{ts,js,json}': ['yarn --cwd backend prettier --write', 'yarn --cwd backend eslint --fix'],
};
