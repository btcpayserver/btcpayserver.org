const { writeFileSync, mkdirSync } = require('fs')
const { dirname, resolve } = require('path')
const assert = require('assert')
const { transifexApi }  = require('@transifex/api')

const { TRANSIFEX_TOKEN: auth } = process.env

try {
  assert(auth, 'Please provide the TRANSIFEX_TOKEN in the .env file')

  transifexApi.setup({ auth });

  (async function () {
    // get associations
    const organization = await transifexApi.Organization.get({ slug: 'btcpayserver' })
    const projects = await organization.fetch('projects')
    const project = await projects.get({ slug: 'btcpayserver-website' })
    const languages = await project.fetch('languages')
    const resources = await project.fetch('resources')
    await languages.fetch();

    // resources
    ['Video', 'Website'].forEach(async (name) => {
      const resourceId = name.toLowerCase()
      const resource = await resources.get({ name })

      // stats
      const stats = await transifexApi.ResourceLanguageStats
        .filter({ project, resource })
      await stats.fetch()
      const result = stats.data.reduce((res, stat) => {
        const key = stat.id.split(':').reverse()[0]
        const data = stat.attributes
        return Object.assign(res, { [key]: data })
      }, {})
      saveJSON(resourceId, result)

      // translations
      languages.data.forEach(async (language) => {
        const languageCode = language.get('code')
        const translations = await transifexApi.ResourceTranslation
          .filter({ resource, language })
          .include('resource_string')
        await translations.fetch()
        const result = translations.data.reduce((res, translation) => {
          const key = translation.get('resource_string').get('key')
          const strings = translation.get('strings')
          return strings ? Object.assign(res, { [key]: strings ? strings.other : null }) : res
        }, {})
        const data = name === 'Video' ? Object.values(result) : result
        saveJSON(`${resourceId}/${languageCode}`, data)
      })
    })
  })()
} catch(err) {
  console.error(err.message)
}

function saveJSON (file, data) {
  const filePath = resolve(__dirname, `../transifex/download/${file}.json`)
  try {
    mkdirSync(dirname(filePath), { recursive: true })
    writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('🚨  Could not save file', filePath, ':', err)
  }
}
