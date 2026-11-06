declare module '*.md?raw' {
  const content: string
  export default content
}

// Pagefind ships the UI without types; only the options this site passes are used.
declare module '@pagefind/default-ui' {
  export class PagefindUI {
    constructor(options: Record<string, unknown>)
    destroy(): void
  }
}
