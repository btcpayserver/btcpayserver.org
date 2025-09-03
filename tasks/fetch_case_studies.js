// Build-time fetcher for blog case studies
// Writes data/caseStudies.json for tasks/render_html.js to consume
const { writeFileSync, mkdirSync } = require('fs')
const { resolve, dirname } = require('path')
const request = require('sync-request')

function tryFetch(url) {
  try {
    const res = request('GET', url, { headers: { 'User-Agent': 'btcpayserver.org-build' } })
    if (res.statusCode >= 200 && res.statusCode < 300) return res.getBody('utf8')
  } catch {}
  return null
}

function saveJSON(file, data) {
  const filePath = resolve(__dirname, `../data/${file}`)
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function run() {
  // Prefer JSON Feed if available
  const jsonFeed = tryFetch('https://blog.btcpayserver.org/feed.json')
  if (jsonFeed) {
    try {
      const feed = JSON.parse(jsonFeed)
      const items = (feed.items || []).filter(it => (it.tags || []).some(t => /case[- ]?stud/i.test(t))).map(it => ({
        id: it.id || it.url,
        title: it.title,
        excerpt: (it.summary || '').replace(/\s+/g, ' ').trim(),
        hero: (it.image || ''),
        url: it.url,
        pdf: null
      }))
      if (items.length) return saveJSON('caseStudies.json', items)
    } catch {}
  }

  // Fallback: default to existing static examples (no network parsing of RSS here)
  const fallback = [
    {
      id: 'namecheap',
      title: 'Namecheap',
      excerpt: 'Namecheap surpasses $73M in BTC revenue with 1.1m transactions through BTCPay',
      hero: '/img/case-studies/namecheap-featured.png',
      url: 'https://blog.btcpayserver.org/case-study-namecheap/',
      pdf: '/case-studies/namecheap.pdf'
    }
  ]
  saveJSON('caseStudies.json', fallback)
}

try {
  run()
  console.log('✅ Case studies data prepared')
} catch (e) {
  console.error('🚨 Could not generate case studies:', e.message)
}

