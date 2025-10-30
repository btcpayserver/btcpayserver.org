// Optional image optimizer: generates WebP/AVIF alongside originals
// Safe no-op if sharp is not installed.
const { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } = require('fs')
const { join, dirname, extname, basename } = require('path')

let sharp
try { sharp = require('sharp') } catch { console.log('ℹ️  Image optimizer: sharp not installed; skipping.') ; process.exit(0) }

const SRC = join(__dirname, '../src/static/img')
const OUT = join(__dirname, '../dist/img')

function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name)
    const s = statSync(p)
    if (s.isDirectory()) return walk(p)
    return [p]
  })
}

async function convert(file) {
  const buf = readFileSync(file)
  const rel = file.replace(SRC, '')
  const base = join(OUT, dirname(rel), basename(rel, extname(rel)))
  mkdirSync(dirname(base), { recursive: true })
  await sharp(buf).webp({ quality: 82 }).toFile(base + '.webp')
  await sharp(buf).avif({ quality: 55 }).toFile(base + '.avif')
}

(async function(){
  const files = walk(SRC).filter(f => /\.(png|jpg|jpeg)$/i.test(f))
  await Promise.all(files.map(convert))
  console.log(`✅ Image optimization complete: ${files.length} files processed.`)
})().catch(e => { console.error('🚨 Image optimize failed:', e.message); process.exit(1) })

