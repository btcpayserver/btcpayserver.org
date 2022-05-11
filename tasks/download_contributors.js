const request = require("sync-request");
const {resolve, dirname} = require("path");
const {mkdirSync, writeFileSync, readFileSync} = require("fs");
const assert = require("assert");

let auth = {};
try {

    const {GH_TOKEN: token} = process.env
    auth = {Authorization: `Basic ${Buffer.from(token).toString('base64')}`}
} catch {
    assert('Please provide the GH_TOKEN in the .env file')
}
function fetchContributorList() {
    try {
        const url = "https://api.github.com/orgs/btcpayserver/repos";
        let json = getData(url)
        let users = {};
        const blacklistRepos = ["btcpayserver/whmcs-plugin"];
        const blacklistUsers = [];
        for (const jsonElement of json) {
            if (jsonElement.fork || jsonElement.archived || jsonElement.disabled || blacklistRepos.indexOf(jsonElement.full_name) >= 0) {
                console.info("Skipping loading contributors for ", jsonElement.full_name, "as it is a fork/archived/disabled")
                continue;
            }
            console.info("Loading contributors for ", jsonElement.full_name)
            const contributors = getData(jsonElement.contributors_url)
            for (const contributor of contributors) {
                if (blacklistUsers.indexOf(contributor.login) >= 0) {
                    continue
                }
                if (contributor.login in users) {
                    users[contributor.login] = {
                        login: contributor.login,
                        contributions: users[contributor.login].contributions + contributor.contributions,
                        avatar_url: contributor.avatar_url,
                        html_url: contributor.html_url
                    }
                } else {
                    users[contributor.login] = {
                        login: contributor.login,
                        contributions: contributor.contributions,
                        avatar_url: contributor.avatar_url,
                        html_url: contributor.html_url
                    }
                }
            }
        }
        users = Object.values(users).sort((a, b) => b["contributions"] - a["contributions"]);
        saveContributorjson(users);
    } catch (err) {
        console.error('🚨  Could not load contributors from Github:', err)
    }

}

function getData(url) {
    const headers = Object.assign({"User-Agent": `your mom`}, auth);

    const req = request('GET', url, {headers})
    const body = req.getBody('utf8')
    let json = JSON.parse(body)
    if (json.content) json = JSON.parse(json.content)
    return json
}

function saveContributorjson(json) {
    const file = resolve(__dirname, `../github/contributors.json`)

    try {
        mkdirSync(dirname(file), {recursive: true})
        writeFileSync(file, JSON.stringify(json, null, 2))
    } catch (err) {
        console.error('🚨  Could not save file', file, ':', err)
    }
}

fetchContributorList();


