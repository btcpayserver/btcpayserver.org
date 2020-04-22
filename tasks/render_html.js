const {
  getTemplate,
  getTransifexJSON,
  getLanguages,
  getLanguageName,
  replaceTemplateVars,
  saveFile
} = require('./util')

// Render html templates
const langs = getLanguages('en-json')
const indexTmpl = getTemplate('html/tmpl.html')
const donateTmpl = getTemplate('html/donate/tmpl.html')
const menuTmpl = getTemplate('html/menu-tmpl.html')
const footerTmpl = getTemplate('html/footer-tmpl.html')
const _jsonDonations = getTemplate('json/donations.json')
const _donationsBlock = JSON.parse(_jsonDonations).map(([name, url, avatar]) => `
            <a href="${url}" class="ind-icon">
              <div class="in-img" style="background-image:url(${avatar})"></div>
              <span class="in-nom">${name}</span>
            </a>`).join('')

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

console.log(`ℹ️  HTML: Rendering ${langs.length} translations …`)

langs.forEach(lang => {
  const [lng] = lang.split('_')
  const isRtl = ['ar', 'fa', 'he'].includes(lng)
  const directory = lng === 'en' ? '' : lng === 'en_GB' ? '' : `${lang}/`
  const translations   = getTransifexJSON(`en-json/translation/${lang}`)
  const lngName = getLanguageName(lang)
  if (!lngName) {
    console.warn(`🛑  Missing language name for "${lang}" – please add it to the LANGUAGE_NAMES in tasks/util.js`)
  }

  const _sub = lngName || lang
  const _lngOpts = getLanguageOptions(langs, lang)
  const _lngst = directory === 'en' ? '' : '/' + directory;

  const tmplVars = Object.assign({}, translations, {
    _jsonDonations,
    _donationsBlock,
    _lngOpts,
    _to: isRtl ? 'rtl' : 'ltr',
    _rl: isRtl ? 'left' : 'right',
    _align: isRtl ? 'stickRight' : 'stickLeft',
    _lnstr: lang,
    _lngst,
    _sub,
    _exp0: lng
  })

  // render footer and add the result to the vars
  tmplVars._ftblk = replaceTemplateVars(footerTmpl, tmplVars)

  // iterate over menu and add the result to the vars
  tmplVars._menTemp = replaceTemplateVars(menuTmpl, tmplVars)

  // files
  saveFile(`${directory}index.html`, replaceTemplateVars(indexTmpl, tmplVars))

  let pages = ["donate"];
  let themes = ["light", "dark"];

  pages.forEach(page => {
    tmplVars._menTemp = replaceTemplateVars(menuTmpl, tmplVars)
    saveFile(`${directory}/${page}/index.html`, replaceTemplateVars(donateTmpl, tmplVars))
  })

  themes.forEach(theme => {
    tmplVars._thrFor = theme;
    tmplVars._menTemp = replaceTemplateVars(menuTmpl, tmplVars)
    saveFile(`${directory}/${theme}/index.html`, replaceTemplateVars(indexTmpl, tmplVars))

    pages.forEach(page => {
      tmplVars._menTemp = replaceTemplateVars(menuTmpl, tmplVars)
      saveFile(`${directory}/${theme}/${page}/index.html`, replaceTemplateVars(donateTmpl, tmplVars))
    })
    tmplVars._thrFor = '';
  })
})

console.log('✅  HTML: Rendering done …')
