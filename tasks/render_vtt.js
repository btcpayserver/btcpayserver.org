const { getTemplate, getTransifexJSON, getLanguages, replaceTemplateVars, saveFile } = require('./util')

// Render video templates
const template = getTemplate('vtt/video_tmpl.vtt')
const langs = getLanguages('video_en_json')

console.log(`ℹ️  Video: Rendering ${langs.length} translations …`)

const sentenceChunks = [4, 2, 1, 3, 1, 1, 1, 3, 1, 2, 1]

langs.forEach(lang => {
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

  const vars = Object.assign({}, parts) // convert array to object
  const rendered = replaceTemplateVars(template, vars)

  saveFile(`vtt/${lang}.vtt`, rendered)
})

console.log('✅  Video: Rendering done …')
