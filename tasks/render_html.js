const {
  getTemplate,
  getTransifexJSON,
  getLanguages,
  getLanguageName,
  replaceTemplateVars,
  saveFile,
  titleCase
} = require('./util')

// Render html templates
const langs = getLanguages('en-json')
const vttLangs = getLanguages('video_en_json')
const indexTmpl = getTemplate('html/tmpl.html')
const donateTmpl = getTemplate('html/donate/tmpl.html')
const menuTmpl = getTemplate('html/menu-tmpl.html')
const footerTmpl = getTemplate('html/footer-tmpl.html')
const jsonDonations = getTemplate('json/donations.json')
const donationsBlock = JSON.parse(jsonDonations).map(([name, url, avatar]) => `
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
  const isEn = lng === 'en'
  const isRtl = ['he', 'ar'].includes(lng)
  const directory = lng === 'en' ? '' : lng === 'en_GB' ? '' : `${lang}/`
  const t = getTransifexJSON(`en-json/translation/${lang}`)
  const hasVtt = vttLangs.includes(lang)
  const vttTrack = isEn
    ? ''
    : `<track src="/vtt/${hasVtt ? lang : 'en_GB'}.vtt" label="${getLanguageName(hasVtt ? lang : 'en_GB')}" srclang="${hasVtt ? lang : 'en'}" kind="subtitles" defaults>`

  const footerParts = t[29].split('FLAT18.CO.UK')

  const lngName = getLanguageName(lang)
  if (!lngName) {
    console.warn(`🛑  Missing language name for "${lang}" – please add it to the LANGUAGE_NAMES in tasks/util.js`)
  }

  const sub = lngName || lang
  const lngOpts = getLanguageOptions(langs, lang)
  const lngOptsDonate = getLanguageOptions(langs, lang, 'donate/')
  var lngst = directory === 'en' ? '' : '/' + directory;

  const tmplVars = {
    thisPage:'',
    jsonDonations,
    donationsBlock,
    vttTrack,
    lngOptsDonate,
    lngOpts,
    __lang: isEn ? 'en' : lang,
    directoryPrefix: isEn ? '' : `/${lang}`,
    to: isRtl ? 'rtl' : 'ltr',
    rl: isRtl ? 'left' : 'right',
    align: isRtl ? 'stickRight' : 'stickLeft',
    L_rl: isRtl ? 'r' : 'l',
    R_rl: isRtl ? 'l' : 'r',
    lnstr: lang,
    lngst: lngst,
    sub,
    exp0: lng,
    _donate: titleCase(t[13]),
    _blog: titleCase(t[2]),
    j: t
  }

  // render footer and add the result to the vars
  tmplVars.ftblk = replaceTemplateVars(footerTmpl, tmplVars)

   // iterate over menu and add the result to the vars
   tmplVars.menTemp = replaceTemplateVars(menuTmpl, tmplVars)

  // files
  saveFile(`${directory}index.html`, replaceTemplateVars(indexTmpl, tmplVars))

  let pages = ["donate"];
  let themes = ["light", "dark"];

  pages.forEach(page => {
    tmplVars.thisPage = "/"+page;
    tmplVars.menTemp = replaceTemplateVars(menuTmpl, tmplVars)
    saveFile(`${directory}/${page}/index.html`, replaceTemplateVars(donateTmpl, tmplVars))
    tmplVars.thisPage = '';
  })

  themes.forEach(theme => {
    tmplVars._thrFor = theme;
    tmplVars.menTemp = replaceTemplateVars(menuTmpl, tmplVars)
    saveFile(`${directory}/${theme}/index.html`, replaceTemplateVars(indexTmpl, tmplVars))
    // saveFile(`${directory}/${type}/donate/index.html`, replaceTemplateVars(donateTmpl, tmplVars))
    pages.forEach(page => {
      tmplVars.thisPage = "/"+page;
      tmplVars.menTemp = replaceTemplateVars(menuTmpl, tmplVars)
      saveFile(`${directory}/${theme}/${page}/index.html`, replaceTemplateVars(donateTmpl, tmplVars))
      tmplVars.thisPage = '';
    })
    tmplVars._thrFor = '';
  })
})

console.log('✅  HTML: Rendering done …')
