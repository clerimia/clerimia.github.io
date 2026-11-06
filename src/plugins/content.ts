import type { Root as MarkdownRoot } from 'mdast'
import type { Root as HtmlRoot } from 'hast'
import type { Plugin } from 'unified'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'

// Keep reading metadata and image zoom independent of the site shell.
export const remarkContent: Plugin<[], MarkdownRoot> = () => (tree, file) => {
  visit(tree, 'image', (node) => {
    node.data = { ...node.data, hProperties: { ...node.data?.hProperties, class: 'zoomable' } }
  })
  const text = toString(tree)
  let words = 0
  let inWord = false
  for (const character of text) {
    if (/\p{Script=Han}/u.test(character)) {
      words++
      inWord = false
    } else if (/[　-〿＀-￯]/u.test(character)) {
      inWord = false
    } else if (/\s/u.test(character)) {
      inWord = false
    } else if (!inWord) {
      words++
      inWord = true
    }
  }
  if (file.data.astro?.frontmatter) {
    file.data.astro.frontmatter.words = words
    file.data.astro.frontmatter.minutesRead = `${Math.ceil(words / 200)} min`
  }
}

export const rehypeExternalLinks: Plugin<[], HtmlRoot> = () => (tree) => {
  visit(tree, 'element', (node) => {
    if (node.tagName !== 'a' || typeof node.properties.href !== 'string') return
    if (!/^(https?:)?\/\//i.test(node.properties.href)) return
    node.properties.rel = ['nofollow', 'noopener', 'noreferrer']
    node.properties.target = '_blank'
    node.children.push({
      type: 'element', tagName: 'span',
      properties: { style: 'user-select:none' },
      children: [{ type: 'text', value: ' ↗' }]
    })
  })
}
