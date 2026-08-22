/**
 * Regenerate the script-src hashes in the deployed CSP.
 *
 * The policy previously carried 'unsafe-inline' on script-src, which is the one
 * genuinely weak directive in an otherwise strict header set: it permits any
 * injected inline script to run, which is most of what a CSP is for.
 *
 * It was there because index.html carries inline scripts of its own: the ld+json
 * structured data blocks and the analytics config. Those are ours and they are
 * fixed at build time, so they can be pinned by hash instead of blanket-allowed.
 * Analytics here is gtag.js loaded directly rather than a Tag Manager container,
 * so nothing downstream needs to inject inline script of its own.
 *
 * This runs after vite build and reads dist/index.html, which is what actually
 * ships. Hashing the source index.html would be wrong: if the bundler ever
 * altered an inline block, the hash would be computed from something the browser
 * never sees, the script would be blocked, and the failure would be silent until
 * someone opened the console. Deriving it from the build output means it cannot
 * drift.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'

const HTML = 'dist/index.html'
const HEADERS = 'dist/_headers'

if (!existsSync(HTML) || !existsSync(HEADERS)) {
  console.error('csp-hashes: dist/index.html or dist/_headers missing. Run after vite build.')
  process.exit(1)
}

const html = readFileSync(HTML, 'utf8')
const hashes = []
for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/\bsrc=/.test(m[1])) continue          // external scripts are covered by the host allowlist
  hashes.push(`'sha256-${createHash('sha256').update(m[2], 'utf8').digest('base64')}'`)
}

if (hashes.length === 0) {
  console.error('csp-hashes: found no inline scripts. Refusing to write a policy that would silently allow nothing.')
  process.exit(1)
}

const headers = readFileSync(HEADERS, 'utf8')
const patched = headers.replace(
  /script-src 'self' 'unsafe-inline'/,
  `script-src 'self' ${hashes.join(' ')}`
)

if (patched === headers) {
  console.error("csp-hashes: could not find \"script-src 'self' 'unsafe-inline'\" in dist/_headers. Policy unchanged, failing loudly rather than shipping a header nobody checked.")
  process.exit(1)
}

writeFileSync(HEADERS, patched)
console.log(`csp-hashes: pinned ${hashes.length} inline scripts, dropped 'unsafe-inline' from script-src`)
