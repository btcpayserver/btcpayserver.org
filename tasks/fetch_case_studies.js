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
      let items = (feed.items || []).filter(it => (it.tags || []).some(t => /case[- ]?stud/i.test(t))).map(it => ({
        id: it.id || it.url,
        title: it.title,
        excerpt: (it.summary || '').replace(/\s+/g, ' ').trim(),
        hero: (it.image || ''),
        url: it.url,
        pdf: null
      }))
      // take top 5
      if (items.length >= 5) {
        return saveJSON('caseStudies.json', items.slice(0,5))
      }
      // pad to at least 5 with known fallbacks
      const fallback = [
        { id: 'namecheap', title: 'Namecheap', excerpt: 'Namecheap surpasses $73M in BTC revenue with 1.1m transactions through BTCPay', hero: '/img/case-studies/namecheap-featured.png', url: 'https://blog.btcpayserver.org/case-study-namecheap/', pdf: '/case-studies/namecheap.pdf' },
        { id: 'bitcoin-atlantis', title: 'Bitcoin Atlantis', excerpt: '€115,100 from 8,750 transactions in 3 days.', hero: '/img/case-studies/bitcoin-atlantis-featured.png', url: 'https://blog.btcpayserver.org/case-study-bitcoin-atlantis/', pdf: '/case-studies/BitcoinAtlantis.pdf' },
        { id: 'bitcoin-people', title: 'Bitcoin People', excerpt: "Built a mobile app atop BTCPay's API to scale to 270 merchants.", hero: '/img/case-studies/bitcoin-people.jpg', url: 'https://blog.btcpayserver.org/case-study-bitcoin-people/', pdf: '/case-studies/BitcoinPeople2024.pdf' },
        { id: 'bitcoin-jungle', title: 'Bitcoin Jungle', excerpt: 'Enables 200+ stores in Costa Rica to embrace Bitcoin.', hero: '/img/case-studies/bitcoin-jungle.jpg', url: 'https://blog.btcpayserver.org/case-study-bitcoin-jungle-cr/', pdf: '/case-studies/BitcoinJungleCR2023.pdf' },
        { id: 'hodlhodl', title: 'HodlHodl', excerpt: 'A Bitcoin business case using BTCPay Server.', hero: '/img/case-studies/hodlhodl.jpg', url: 'https://blog.btcpayserver.org/category/case-studies/', pdf: null }
      ]
      const seen = new Set(items.map(it => it.id))
      for (const f of fallback) { if (items.length >= 5) break; if (!seen.has(f.id)) items.push(f) }
      return saveJSON('caseStudies.json', items.slice(0,5))
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
    },
    { id: 'bitcoin-atlantis', title: 'Bitcoin Atlantis', excerpt: '€115,100 from 8,750 transactions in 3 days.', hero: '/img/case-studies/bitcoin-atlantis-featured.png', url: 'https://blog.btcpayserver.org/case-study-bitcoin-atlantis/', pdf: '/case-studies/BitcoinAtlantis.pdf' },
    { id: 'bitcoin-people', title: 'Bitcoin People', excerpt: "Built a mobile app atop BTCPay's API to scale to 270 merchants.", hero: '/img/case-studies/bitcoin-people.jpg', url: 'https://blog.btcpayserver.org/case-study-bitcoin-people/', pdf: '/case-studies/BitcoinPeople2024.pdf' },
    { id: 'bitcoin-jungle', title: 'Bitcoin Jungle', excerpt: 'Enables 200+ stores in Costa Rica to embrace Bitcoin.', hero: '/img/case-studies/bitcoin-jungle.jpg', url: 'https://blog.btcpayserver.org/case-study-bitcoin-jungle-cr/', pdf: '/case-studies/BitcoinJungleCR2023.pdf' },
    { id: 'hodlhodl', title: 'HodlHodl', excerpt: 'A Bitcoin business case using BTCPay Server.', hero: '/img/case-studies/hodlhodl.jpg', url: 'https://blog.btcpayserver.org/category/case-studies/', pdf: null }
  ]
  saveJSON('caseStudies.json', fallback.slice(0,5))
}

try {
  run()
  console.log('✅ Case studies data prepared')
} catch (e) {
  console.error('🚨 Could not generate case studies:', e.message)
}
