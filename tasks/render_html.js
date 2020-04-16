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
    const name = getLanguageName(code)
    const region = rgn && !isEn ? ` (${rgn.toLowerCase()})` : ''
    const prefix = isEn ? '' : `/${code}`
    const url = `${prefix}/${pagePath}`
    return res.concat(`<li><a href="${url}">${name}${region}</a></li>`)
  }, []).join('')
}

console.log(`HTML: Rendering ${langs.length} translations …`)

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
    lngst:lngst,
    sub: getLanguageName(lang),
    exp0: lng,
    _donate: titleCase(t[38]),
    _blog: titleCase(t[2]),
    exp5624: t[24] && t[56] ? t[24].split(t[56])[0] : '',
    exp5756: t[24] && t[56] && t[57] && t[24].split(t[56])[1] ? t[24].split(t[56])[1].split(t[57])[0] : '',
    exp5857: t[24] && t[57] && t[58] && t[24].split(t[57])[1] ? t[24].split(t[57])[1].split(t[58])[0] : '',
    exp5069: t[24] && t[59] && t[60] && t[24].split(t[59])[1] ? t[24].split(t[59])[1].split(t[60])[0] : '',
    exp229: footerParts.length > 1 ? footerParts[1].replace('.', '<br>') : '',
    exp29: footerParts[0],
    exp71: t[11],
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

console.log(`HTML: Rendering done …`)
