const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { dirname, resolve } = require('path')

const LANGUAGE_NAMES = {
  am_ET: 'አማርኛ',
  ar: 'العربية',
  bg: 'български',
  bs_BA: 'Bosanski',
  ca_ES: 'Català',
  cs_CZ: 'čeština',
  da_DK: 'Dansk',
  de_DE: 'Deutsch',
  el_GR: 'Ελληνικά',
  es_ES: 'Español',
  fa: 'فارسی',
  fi_FI: 'Suomi',
  fr_FR: 'Français',
  he: 'עברית',
  hi: 'हिन्दी',
  hr: 'Hrvatski',
  it_IT: 'Italiano',
  ja_JP: '日本語',
  ko: '한국어',
  nl_NL: 'Nederlands',
  pt_BR: 'Português',
  ru_RU: 'русский',
  sk_SK: 'Slovenčina',
  sl_SI: 'Slovenščina',
  sr: 'српски',
  sv: 'Svenska',
  tr: 'Türkçe',
  uk: 'українська',
  'zh-Hans': '中文',
}

function getTemplate (name) {
  const file = resolve(__dirname, `../source/src/${name}`)

  try {
    return readFileSync(file, 'utf8')
  } catch (err) {
    console.error('Could not get template', name, ':', err)
  }
}

function getTransifexJSON (resource) {
  try {
    const file = resolve(__dirname, `../transifex/${resource}.json`)
    const content = readFileSync(file, 'utf8')

    return JSON.parse(content)
  } catch (err) {
    console.error('Could not read file', file, ':', err)
  }
}

// returns an array of available languages.
// here we can also filter based on completeness.
function getLanguages (resource, completenessThreshold = 85) {
  const stats = getTransifexJSON(`${resource}/stats`)

  return Object.keys(stats).reduce((res, lang) => {
    const { completed } = stats[lang]
    const completeness = parseInt(completed)
    if (completeness >= completenessThreshold) res.push(lang)

    return res
  }, [])
}

function getLanguageName (code) {
  return LANGUAGE_NAMES[code]
}

function replaceTemplateVars(tmpl, vars) {
  return Object.keys(vars).reduce((rendered, varName) => {
    const value = vars[varName]

    return value instanceof Array
      ? rendered.replace(new RegExp(`\\$${varName}\\[(\\d+)\\]`, 'g'), (_, i) => value[i])
      : rendered.replace(new RegExp(`\\$${varName}`, 'g'), value)
  }, tmpl)
}

function titleCase (str) {
  return str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

function saveFile (filePath, content) {
  const file = resolve(__dirname, `../dist/${filePath}`)

  try {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, content)
  } catch (err) {
    console.error('Could not save file', file, ':', err)
  }
}

module.exports = {
  getTemplate,
  getLanguages,
  getLanguageName,
  getTransifexJSON,
  replaceTemplateVars,
  saveFile,
  titleCase
}
