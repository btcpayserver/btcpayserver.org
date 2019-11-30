const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { dirname, join, resolve } = require('path')
const assert = require('assert')
const request = require('sync-request')

const { TRANSIFEX_TOKEN: token } = process.env

assert('Please provide the TRANSIFEX_TOKEN in the .env file')

const auth = Buffer.from(`api:${token}`).toString('base64')

function saveTransifexJSON (resource, json) {
  try {
    const file = join(resolve(__dirname, '..'), 'transifex', `${resource}.json`)
    const dir = dirname(file)
    const content = JSON.stringify(json, null, 2)

    mkdirSync(dir, { recursive: true })
    writeFileSync(file, content)
  } catch (err) {
    console.error('Could not save file', file, ':', err)
  }
}

function downloadTransifexJSON (resource) {
  try {
    const url = `https://www.transifex.com/api/2/project/btcpayserver-website/resource/${resource}`
    const headers = { Authorization: `Basic ${auth}` }
    const req = request('GET', url, { headers })
    const body = req.getBody('utf8')
    const json = JSON.parse(body)

    saveTransifexJSON(resource, json)

    return json
  } catch (err) {
    console.error('Could not load', resource, 'from Transifex:', err)
  }
}

// Get available languages for website and videos
['en-json', 'video_en_json'].forEach(type => {
  const stats = downloadTransifexJSON(`${type}/stats`)
  const langs = Object.keys(stats)

  console.log(`${type}: Fetching ${langs.length} translations …`)

  langs.forEach(lang => downloadTransifexJSON(`${type}/translation/${lang}`))
})
