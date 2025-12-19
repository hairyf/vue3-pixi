// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  rules: {
    'ts/no-empty-object-type': 'off',
    'vue/no-deprecated-html-element-is': 'off',
  },
})
