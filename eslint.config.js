import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    markdown: {
      overrides: {
      },
    },
  },
).removeRules(['vue/no-v-text-v-html-on-component'])
