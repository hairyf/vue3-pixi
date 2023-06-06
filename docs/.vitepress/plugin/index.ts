import type { MarkdownRenderer } from 'vitepress'
import demo from 'markdown-it-vitepress-demo'
import tooltip from './tooltip'

export function mdPlugin(md: MarkdownRenderer) {
  md.use(demo)
  md.use(tooltip)
}
