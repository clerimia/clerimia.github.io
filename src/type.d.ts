declare module 'virtual:config' {
  const Config: import('astro-pure/types').ConfigOutput
  export default Config
}

declare module '*.md?raw' {
  const content: string
  export default content
}
