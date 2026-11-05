import type { APIRoute } from 'astro'

import design from '../../DESIGN.md?raw'

export const prerender = true

// A stable, machine-readable entry point for design agents. The source of truth
// remains DESIGN.md; this endpoint does not maintain a second copy.
export const GET: APIRoute = () =>
  new Response(design, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
