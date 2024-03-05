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
  en: 'English',
  en_GB: 'English',
  es_ES: 'Español',
  es_419: 'Spanish',
  fa: 'فارسی',
  fi_FI: 'Suomi',
  fr_FR: 'Français',
  he: 'עברית',
  hi: 'हिन्दी',
  hr: 'Hrvatski',
  hu_HU: 'Magyar',
  id: 'Indonesian',
  it_IT: 'Italiano',
  ja_JP: '日本語',
  ko: '한국어',
  lt: 'Lithuanian',
  nl_NL: 'Nederlands',
  no: 'Norwegian',
  pl: 'Polski',
  pt_BR: 'Português',
  pt_PT: 'Português',
  ro: 'Română',
  ru_RU: 'русский',
  sk_SK: 'Slovenčina',
  sl_SI: 'Slovenščina',
  sr: 'српски',
  sv: 'Svenska',
  th_TH: 'Thai',
  tr: 'Türkçe',
  uk: 'українська',
  'zh-Hans': '中文',
  zu: 'Zulu'
}

function getTemplate(name) {
  const file = resolve(__dirname, `../src/${name}`)

  try {
    return readFileSync(file, 'utf8')
  } catch (err) {
    console.error('🚨  Could not get template', name, ':', err.message)
  }
}

function getTransifexJSON(resource) {
  const file = resolve(__dirname, `../transifex/download/${resource}.json`)
  try {
    const content = readFileSync(file, 'utf8')
    return JSON.parse(content)
  } catch (err) {
    console.error('🚨  Could not read file', file, ':', err.message)
  }
}

function getContributorJSON(resource) {
  const file = resolve(__dirname, `../github/contributors.json`)

  try {
    const content = readFileSync(file, 'utf8')

    return JSON.parse(content)
  } catch (err) {
    console.error('🚨  Could not read file', file, ':', err.message)
  }
}

// returns an array of available languages.
// here we can also filter based on completeness.
function getLanguages (resource, completenessThreshold = 80) {
  try {
    const stats = getTransifexJSON(resource)

    return Object.keys(stats).reduce((res, lang) => {
      const { total_words, translated_words } = stats[lang]
      const completeness = (translated_words / total_words) * 100
      if (completeness >= completenessThreshold) res.push(lang)

      return res
    }, []).sort()
  } catch(err) {
    console.error(err.message)
    return ['en_GB']
  }
}

function getLanguageName (code) {
  return LANGUAGE_NAMES[code]
}

function replaceTemplateVars(tmpl, vars) {
  return Object.keys(vars).reduce((rendered, varName) => {
    const value = vars[varName]
    const regex = new RegExp(`\\{\\{\s?${varName}\s?\\}\\}`, 'g')

    return value instanceof Array
      ? rendered.replace(regex, (_, i) => value[i])
      : rendered.replace(regex, value)
  }, tmpl)
}

function saveFile (filePath, content) {
  const file = resolve(__dirname, `../dist/${filePath}`)

  try {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, content)
  } catch (err) {
    console.error('🚨  Could not save file', file, ':', err)
  }
}

module.exports = {
  getTemplate,
  getLanguages,
  getLanguageName,
  getTransifexJSON,
  replaceTemplateVars,
  saveFile,
  getContributorJSON
}
