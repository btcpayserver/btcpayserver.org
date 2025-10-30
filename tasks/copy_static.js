// Cross-platform copy: copies contents of src/static into dist
const { readdirSync, statSync, mkdirSync, copyFileSync } = require('fs')
const { resolve, join, relative, dirname } = require('path')

const SRC = resolve(__dirname, '../src/static')
const DEST = resolve(__dirname, '../dist')

function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name)
    const s = statSync(p)
    return s.isDirectory() ? walk(p) : [p]
  })
}

function main() {
  const files = walk(SRC)
  files.forEach(file => {
    const rel = relative(SRC, file)
    const out = join(DEST, rel)
    mkdirSync(dirname(out), { recursive: true })
    copyFileSync(file, out)
  })
  console.log(`✅ Copied ${files.length} static file(s) to dist/`)
}

try { main() } catch (e) { console.error('🚨 copy_static failed:', e.message); process.exit(1) }

