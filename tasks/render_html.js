const {
  getTemplate,
  getTransifexJSON,
  getContributorJSON,
  getLanguages,
  getLanguageName,
  replaceTemplateVars,
  saveFile
} = require('./util')

// Render html templates
const langs = getLanguages('website')
const master = require('../transifex/resources/website.json')
const indexTmpl = getTemplate('html/tmpl.html')
const donateTmpl = getTemplate('html/donate/tmpl.html')
const menuTmpl = getTemplate('html/menu-tmpl.html')
const footerTmpl = getTemplate('html/footer-tmpl.html')
const integrationsTmpl = getTemplate('html/integrations/tmpl.html')
const contributors = getContributorJSON()
const _contributorsBlock = contributors.map((item) => `
            <a href="${item.html_url}" class="ind-icon">
              <div class="in-img" style="background-image:url(${item.avatar_url})"></div>
              <span class="in-nom">${item.login}</span>
            </a>`).join('')

const { readFileSync, existsSync } = require('fs')

function buildHreflangLinks (langs, pagePath = '') {
  const base = 'https://btcpayserver.org'
  const links = langs.map(code => {
    const [main, rgn] = code.split('_')
    const isEn = main === 'en'
    const prefix = isEn ? '' : `/${code}`
    const href = `${base}${prefix}/${pagePath}`
    const hreflang = rgn ? `${main}-${rgn.toLowerCase()}` : main
    return `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`
  }).join('\n\t')
  const xdefault = `<link rel="alternate" hreflang="x-default" href="${base}/${pagePath}" />`
  return `${links}\n\t${xdefault}`
}

function loadJSON(pathRel, fallback = null) {
  try {
    const file = require('path').resolve(__dirname, pathRel)
    if (!existsSync(file)) return fallback
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch { return fallback }
}

function buildIntegrations(json) {
  if (!Array.isArray(json) || !json.length) return { grid: '', filters: '' }
  const items = json.map(it => {
    const tags = (it.tags || []).join(',')
    const type = it.type || ''
    const logo = it.logo || ''
    return `
      <li class="int-card" data-tags="${tags}" data-type="${type}" data-name="${(it.name||'').toLowerCase()}">
        <a href="${it.link}" target="_blank" rel="noopener">
          ${logo ? `<img src="${logo}" alt="${it.name}" loading="lazy" decoding="async">` : ''}
          <h3>${it.name}</h3>
        </a>
      </li>`
  }).join('')
  const popular = ['Shopify','WooCommerce','Drupal','Zapier','API']
  const chips = popular.map(p => `<button class="int-chip" data-chip="${p.toLowerCase()}">${p}</button>`).join('')
  return { grid: items, filters: chips }
}

function buildCaseStudiesBlock () {
  try {
    const file = require('path').resolve(__dirname, '../data/caseStudies.json')
    if (existsSync(file)) {
      const json = JSON.parse(readFileSync(file, 'utf8'))
      if (Array.isArray(json) && json.length) {
        const items = json.map(item => {
          const img = item.hero || '/img/case-studies/placeholder.png'
          const title = item.title || ''
          const excerpt = item.excerpt || ''
          const url = item.url || '#'
          const pdf = item.pdf
          return `
            <li>
              <a href="${url}" target="_blank" rel="noopener">
                <img src="${img}" alt="${title}" loading="lazy" decoding="async" />
              </a>
              <h3>${title}</h3>
              <p>${excerpt}</p>
              <div class="buttons">
                <a href="${url}" target="_blank" rel="noopener">{{view-case-study}}</a>
                ${pdf ? `<a href="${pdf}" target="_blank" rel="noopener">{{download-pdf}}</a>` : ''}
              </div>
            </li>`
        }).join('')
        return `<ul>${items}</ul>\n        <p>
          <a title="{{view-all-case-studies}}" class="modernLink featuresBlockLink"
          href="https://blog.btcpayserver.org/category/case-studies/" target="blank_">{{view-all-case-studies}}&nbsp;&nbsp;<i
            class="fas fa-long-arrow-alt-{{_rl}}"></i>
          </a>
        </p>`
      }
    }
  } catch (e) {
    console.warn('⚠️ Case studies data not available:', e.message)
  }
  // Fallback to previous static block
  return `
        <ul>
        <li>
          <a href="https://blog.btcpayserver.org/case-study-namecheap/" target="_blank" rel="noopener">
            <img src="/img/case-studies/namecheap-featured.png" alt="BTCPay Server Namecheap Study" loading="lazy" decoding="async" />
          </a>
          <h3>Namecheap</h3>
          <p>Namecheap surpasses $73M in BTC revenue with 1.1m transactions through BTCPay</p>
          <div class="buttons">
            <a href="https://blog.btcpayserver.org/case-study-namecheap/" target="_blank" rel="noopener">{{view-case-study}}</a>
            <a href="/case-studies/namecheap.pdf" target="_blank" rel="noopener">{{download-pdf}}</a>
          </div>
        </li>
        <li>
          <a href="https://blog.btcpayserver.org/case-study-bitcoin-atlantis/" target="_blank" rel="noopener">
            <img src="/img/case-studies/bitcoin-atlantis-featured.png" alt="Bitcoin Atlantis" loading="lazy" decoding="async" />
          </a>
          <h3>Bitcoin Atlantis</h3>
          <p>€115,100 from 8,750 Transactions in 3 Days, Showcasing Bitcoin's Role as a Payment Method.</p>
          <div class="buttons">
            <a href="https://blog.btcpayserver.org/case-study-bitcoin-atlantis/" target="_blank" rel="noopener">{{view-case-study}}</a>
            <a href="/case-studies/BitcoinAtlantis.pdf" target="_blank" rel="noopener">{{download-pdf}}</a>
          </div>
        </li>
        <li>
          <a href="https://blog.btcpayserver.org/case-study-bitcoin-people/" target="_blank" rel="noopener">
            <img src="/img/case-studies/bitcoin-people.jpg" alt="BTCPay Server Bitcoin People Case Study" loading="lazy" decoding="async" />
          </a>
          <h3>Bitcoin People</h3>
          <p>Bitcoin People built a mobile app on top of BTCPay's API to scale bitcoin to 270 merchants.</p>
          <div class="buttons">
            <a href="https://blog.btcpayserver.org/case-study-bitcoin-people/" target="_blank" rel="noopener">{{view-case-study}}</a>
            <a href="/case-studies/BitcoinPeople2024.pdf" target="_blank" rel="noopener">{{download-pdf}}</a>
          </div>
        </li>
        <li>
          <a href="https://blog.btcpayserver.org/case-study-bitcoin-jungle-cr/" target="_blank" rel="noopener">
            <img src="/img/case-studies/bitcoin-jungle.jpg" alt="BTCPay Server Bitcoin Jungle Case Study" loading="lazy" decoding="async" />
          </a>
          <h3>Bitcoin Jungle</h3>
          <p>Bitcoin Jungle enables 200+ stores in Costa Rica to embrace Bitcoin.</p>
          <div class="buttons">
            <a href="https://blog.btcpayserver.org/case-study-bitcoin-jungle-cr/" target="_blank" rel="noopener">{{view-case-study}}</a>
            <a href="/case-studies/BitcoinJungleCR2023.pdf" target="_blank" rel="noopener">{{download-pdf}}</a>
          </div>
        </li>
      </ul>
      <p>
        <a title="{{view-all-case-studies}}" class="modernLink featuresBlockLink"
        href="https://blog.btcpayserver.org/category/case-studies/" target="blank_">{{view-all-case-studies}}&nbsp;&nbsp;<i
          class="fas fa-long-arrow-alt-{{_rl}}"></i>
        </a>
      </p>`
}

function getLanguageOptions (langs, lang, pagePath = '') {
  return langs.reduce((res, code) => {
    if (code === lang) return res
    const [main, rgn] = code.split('_')
    const isEn = main === 'en'
    const name = getLanguageName(code) || code
    const region = rgn && !isEn ? ` (${rgn.toLowerCase()})` : ''
    const prefix = isEn ? '' : `/${code}`
    const url = `${prefix}/${pagePath}`
    return res.concat(`<li><a href="${url}">${name}${region}</a></li>`)
  }, []).join('')
}

function getLanguageOptionsSubset (langs, lang, subset = [], pagePath = '') {
  const set = subset.length ? langs.filter(c => subset.includes(c)) : langs
  return set.reduce((res, code) => {
    if (code === lang) return res
    const [main, rgn] = code.split('_')
    const isEn = main === 'en'
    const name = getLanguageName(code) || code
    const region = rgn && !isEn ? ` (${rgn.toLowerCase()})` : ''
    const prefix = isEn ? '' : `/${code}`
    const url = `${prefix}/${pagePath}`
    return res.concat(`<li><a href="${url}">${name}${region}</a></li>`)
  }, []).join('')
}

console.log(`ℹ️  HTML: Rendering ${langs.length} translations …`)

langs.forEach(lang => {
  const [lng] = lang.split('_')
  const isRtl = ['ar', 'fa', 'he'].includes(lng)
  const directory = lng === 'en' ? '' : lng === 'en_GB' ? '' : `${lang}/`
  const translations  = getTransifexJSON(`website/${lang}`)
  const lngName = getLanguageName(lang)
  if (!lngName) {
    console.warn(`🛑 Missing language name for "${lang}" – please add it to the LANGUAGE_NAMES in tasks/util.js`)
  }

  const _sub = lngName || lang
  const _lngOpts = getLanguageOptions(langs, lang)
  const TOP_LOCALES = ['en_GB','fr_FR','es_ES','de_DE','pt_BR','ru_RU','ja_JP','zh-Hans']
  const topAvailable = langs.filter(c => TOP_LOCALES.includes(c))
  const _topLngOpts = getLanguageOptionsSubset(langs, lang, topAvailable)
  const _allLngOpts = getLanguageOptions(langs, lang)
  const _lngst = directory === 'en' ? '' : '/' + directory;
  const _canonical = `https://btcpayserver.org/${directory}`
  const _hreflangLinks = buildHreflangLinks(langs)
  const _caseStudiesBlock = buildCaseStudiesBlock()
  const integrations = loadJSON('../data/integrations.json', [])
  const builtInt = buildIntegrations(integrations)
  const tmplVars = Object.assign({}, master, translations, {
    _contributorsBlock,
    _lngOpts,
    _topLngOpts,
    _allLngOpts,
    _to: isRtl ? 'rtl' : 'ltr',
    _rl: isRtl ? 'left' : 'right',
    _align: isRtl ? 'stickRight' : 'stickLeft',
    _lnstr: lang,
    _lngst,
    _sub,
    _exp0: lng,
    _canonical,
    _hreflangLinks,
    _caseStudiesBlock,
    _integrationsGrid: builtInt.grid,
    _integrationsFilters: builtInt.filters
  })

  // render footer and add the result to the vars
  tmplVars._ftblk = replaceTemplateVars(footerTmpl, tmplVars)

  // iterate over menu and add the result to the vars
  tmplVars._menTemp = replaceTemplateVars(menuTmpl, tmplVars)

  // files
  // index
  saveFile(`${directory}index.html`, replaceTemplateVars(indexTmpl, tmplVars))
  // donate page has its own path, update canonical/hreflang for donate
  const donateVars = Object.assign({}, tmplVars, {
    _canonical: `https://btcpayserver.org/${directory}donate/`,
    _hreflangLinks: buildHreflangLinks(langs, 'donate/')
  })
  saveFile(`${directory}/donate/index.html`, replaceTemplateVars(donateTmpl, donateVars))
  // integrations page
  const integrationsVars = Object.assign({}, tmplVars, {
    _canonical: `https://btcpayserver.org/${directory}integrations/`,
    _hreflangLinks: buildHreflangLinks(langs, 'integrations/')
  })
  saveFile(`${directory}/integrations/index.html`, replaceTemplateVars(integrationsTmpl, integrationsVars))
})

console.log('✅ HTML: Rendering done …')
