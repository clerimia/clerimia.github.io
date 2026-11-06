import type { APIRoute } from 'astro'

import design from '../../DESIGN.md?raw'

export const prerender = true

// A stable, machine-readable entry point for design agents. The source of truth
// remains DESIGN.md; this endpoint does not maintain a second copy.
// Normalize to LF so the served bytes do not depend on the checkout's line endings.
export const GET: APIRoute = () =>
  new Response(design.replace(/\r\n/g, '\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
