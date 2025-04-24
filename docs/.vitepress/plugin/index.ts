import type { MarkdownRenderer } from 'vitepress'
import { demoMdPlugin } from 'vitepress-plugin-demo'
import tooltip from './tooltip'

export function mdPlugin(md: MarkdownRenderer) {
  md.use(demoMdPlugin)
  md.use(tooltip)
}
