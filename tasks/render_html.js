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
const indexTmpl = getTemplate('html/tmpl.html')
const donateTmpl = getTemplate('html/donate/tmpl.html')
const footerTmpl = getTemplate('html/footer-tmpl.html')
const jsonDonations = getTemplate('json/donations.json')
const donationsBlock = JSON.parse(jsonDonations).map(([name, url, avatar]) => `
            <a href="${url}" class="ind-icon">
              <div class="in-img" style="background-image:url(${avatar})"></div>
              <span class="in-nom">${name}</span>
            </a>`).join('')

console.log(`HTML: Rendering ${langs.length} translations …`)

langs.forEach(lang => {
  const [lng] = lang.split('_')
  const isRtl = ['he', 'ar'].includes(lng)
  const directory = lng === 'en' ? '' : `${lang}/`
  const t = getTransifexJSON(`en-json/translation/${lang}`)

  const footerParts = t[29].split('FLAT18.CO.UK')

  const tmplVars = {
    jsonDonations,
    donationsBlock,
    __lang: lng === 'en' ? 'en' : lang,
    directoryPrefix: lng === 'en' ? '' : `/${lang}`,
    to: isRtl ? 'rtl' : 'ltr',
    rl: isRtl ? 'left' : 'right',
    align: isRtl ? 'stickRight' : 'stickLeft',
    L_rl: isRtl ? 'r' : 'l',
    R_rl: isRtl ? 'l' : 'r',
    lnstr: lng,
    sub: getLanguageName(lang),
    exp0: lng,
    enlngfb: lng === 'en' ? '' : '<track src="/vtt/en.vtt" label="English" kind="subtitles" srclang="en">',
    _donate: titleCase(t[38]),
    _blog: titleCase(t[2]),
    exp5624: t[24] && t[56] ? t[24].split(t[56])[0] : '',
    exp5756: t[24] && t[56] && t[57] && t[24].split(t[56])[1] ? t[24].split(t[56])[1].split(t[57])[0] : '',
    exp5857: t[24] && t[57] && t[58] && t[24].split(t[57])[1] ? t[24].split(t[57])[1].split(t[58])[0] : '',
    exp5069: t[24] && t[59] && t[60] && t[24].split(t[59])[1] ? t[24].split(t[59])[1].split(t[60])[0] : '',
    exp229: footerParts.length > 1 ? footerParts[1].replace('.', '<br>') : '',
    exp29: footerParts[0],
    exp71: t[11],
    j: t,
    // TODO:
    // lngOpts:
    // lDngOptsDonate:
  }

  // render footer and add the result to the vars
  tmplVars.ftblk = replaceTemplateVars(footerTmpl, tmplVars)

  // files
  saveFile(`${directory}index.html`, replaceTemplateVars(indexTmpl, tmplVars))
  saveFile(`${directory}/donate/index.html`, replaceTemplateVars(donateTmpl, tmplVars))
})

console.log(`HTML: Rendering done …`)
