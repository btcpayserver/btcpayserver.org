const { getTemplate, getTransifexJSON, getLanguages, saveFile } = require('./util')

// Render html templates
const indexTmpl = getTemplate('html/tmpl.html')
const donateTmpl = getTemplate('html/donate/tmpl.html')
const footerTmpl = getTemplate('html/footer-tmpl.html')

const langs = getLanguages('en-json')

console.log(`HTML: Rendering ${langs.length} translations …`)

langs.forEach(lang => {
  const directory = lang === 'en_GB' ? '' : `${lang}/`
  const translations = getTransifexJSON(`en-json/translation/${lang}`)

  // footer
  const footerHtml = footerTmpl.replace(/\$j\[(\d+)\]/g, (_, p) => translations[p])

  // index.html
  let indexHtml = indexTmpl.replace(/\$j\[(\d+)\]/g, (_, p) => translations[p])
  indexHtml.replace('$ftblk', footerHtml)

  saveFile(`${directory}index.html`, indexHtml)

  // donate/index.html
  let donateHtml = donateTmpl.replace(/\$j\[(\d+)\]/g, (_, p) => translations[p])
  donateHtml.replace('$ftblk', footerHtml)

  saveFile(`${directory}/donate/index.html`, donateHtml)
})

console.log(`HTML: Rendering done …`)
