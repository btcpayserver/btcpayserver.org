const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { dirname, resolve } = require('path')

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
  getTransifexJSON,
  saveFile
}
