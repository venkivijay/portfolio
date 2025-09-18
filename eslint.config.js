import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    markdown: {
      overrides: {
      },
    },
    ignores: [
      'node_modules/',
      'dist/',
      '*.md',
      '*.json',
      '*.config.js',
      '.vscode/',
      '.husky/',
      'public/',
      '*.log',
    ]
  },
).removeRules(['vue/no-v-text-v-html-on-component'])
