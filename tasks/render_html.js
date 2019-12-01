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
const indexTmpl = getTemplate('html/tmpl.html')
const donateTmpl = getTemplate('html/donate/tmpl.html')
const footerTmpl = getTemplate('html/footer-tmpl.html')

const langs = getLanguages('en-json')

console.log(`HTML: Rendering ${langs.length} translations …`)

langs.forEach(lang => {
  const [lng] = lang.split('_')
  const isRtl = ['he', 'ar'].includes(lng)
  const directory = lng === 'en' ? '' : `${lang}/`
  const translations = getTransifexJSON(`en-json/translation/${lang}`)

  const footerParts = translations[29].split('FLAT18.CO.UK')

  const tmplVars = {
    directoryPrefix: lng === 'en' ? '' : `/${lang}`,
    to: isRtl ? 'rtl' : 'ltr',
    rl: isRtl ? 'left' : 'right',
    align: isRtl ? 'stickRight' : 'stickLeft',
    L_rl: isRtl ? 'r' : 'l',
    R_rl: isRtl ? 'l' : 'r',
    lnstr: lng,
    lngOpts: 'TODO',
    sub: getLanguageName(lang),
    exp0: lng,
    enlngfb: lng === 'en' ? '' : '<track src="/vtt/en.vtt" label="English" kind="subtitles" srclang="en">',

    _donate: titleCase(translations[38]),
    _blog: titleCase(translations[2]),
    exp229: footerParts.length > 1 ? footerParts[1].replace('.', '<br>') : '',
    exp29: footerParts[0],
    j: translations
  }


    // $exp5624 = isset($j[56], $j[24]) && strpos($j[24], $j[56]) ? explode($j[56], $j[24])[0] : '';
    // $exp5756 = isset($j[56], $j[57]) && strpos($j[24], $j[56]) ? explode($j[57], explode($j[56], $j[24])[1])[0] : '';
    // $exp5857 = isset($j[57], $j[58]) && strpos($j[24], $j[57]) ? explode($j[58], explode($j[57], $j[24])[1])[0] : '';
    // $exp5069 = isset($j[59], $j[60]) && strpos($j[24], $j[59]) ? explode($j[60], explode($j[59], $j[24])[1])[0] : '';
    // $exp29 = isset($j[29]) ? strpos($j[29], 'FLAT18.CO.UK') ? explode("FLAT18.CO.UK", $j[29])[0] : $j[29] : '';
    // $exp229 = isset($j[29]) && strpos($j[29], 'FLAT18.CO.UK') ? str_replace('.', '<br>', explode("FLAT18.CO.UK", $j[29])[1]) : '';


  // render footer and add the result to the vars
  tmplVars.ftblk = replaceTemplateVars(footerTmpl, tmplVars)

  // files
  saveFile(`${directory}index.html`, replaceTemplateVars(indexTmpl, tmplVars))
  saveFile(`${directory}/donate/index.html`, replaceTemplateVars(donateTmpl, tmplVars))
})

console.log(`HTML: Rendering done …`)
