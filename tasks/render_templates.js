const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { dirname, resolve } = require('path')

function getTemplate (name) {
  const file = resolve(__dirname, `../source/src/${name}`)

  return readFileSync(file, 'utf8')
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

function renderTemplate (tmpl, translations) {
  console.log(translations)
  return tmpl
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

// Render website templates
// const siteStats = getTransifexJSON('en-json/stats')
// const siteLangs = Object.keys(siteStats)
// const indexHtml = getTemplate('html/tmpl.html')

// console.log(`Site: Rendering ${siteLangs.length} translations …`)

// siteLangs.forEach(lang => {
//   console.log(`Site: Rendering ${lang} …`)

//   const translations = getTransifexJSON(`en-json/translation/${lang}`)
//   const rendered = renderTemplate(indexHtml, translations)
//   const filePath = lang === 'en_GB' ? 'index.html' : `${lang}/index.html`

//   saveFile(filePath, rendered)
// })

// Render video templates
const videoStats = getTransifexJSON('video_en_json/stats')
const videoLangs = Object.keys(videoStats)
const videoVtt = getTemplate('vtt/video_tmpl.vtt')

console.log(`Video: Rendering ${videoLangs.length} translations …`)

const sentenceChunks = [4, 2, 1, 3, 1, 1, 1, 3, 1, 2, 1]

videoLangs.forEach(lang => {
  console.log(`Video: Rendering ${lang} …`)

  const translations = getTransifexJSON(`video_en_json/translation/${lang}`)

  const parts = translations.reduce((res, sentence, index) => {
    const chunks = sentenceChunks[index]
    const words = sentence.split(' ')
    const wordsPerChunk = Math.ceil(words.length / chunks)
    Array.from({ length: chunks }).forEach((_, i) => {
      const start = i * wordsPerChunk
      const end = (i + 1) * wordsPerChunk
      const chunk = words.slice(start, end)
      res.push(chunk.join(' '))
    })
    return res
  }, [])

  const rendered = videoVtt.replace(/\$p\[(\d+)\]/g, (match, p) => parts[p])
  const filePath = `vtt/${lang}.vtt`

  saveFile(filePath, rendered)
})
