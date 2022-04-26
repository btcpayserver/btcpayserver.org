# btcpayserver.org

The official website repository of [BTCPay Server project](https://github.com/btcpayserver/btcpayserver/).

## Contributing

Feel free to contribute ideas, code or content to improve the website.

Prior to submitting a major pull-request, make sure to discuss the changes with the community on [#website channel on Mattermost](https://chat.btcpayserver.org/btcpayserver/channels/website) to avoid duplicating the work.

If you're a developer looking to help, but you're not sure where to begin, check the `good first issue` label, which contains small pieces of work that have been specifically flagged as being friendly to new contributors.

Please do not open issues not related to the website in this repository. If you have an issue with BTCPay Server software, open an issue in an [appropriate repository](https://github.com/btcpayserver/btcpayserver/issues).

### Source files

All changes to the website should be applied in the `src` folder.

The files in the `src` are used in conjunction with the `transifex/resources` to make the btcpayserver.org website.

Create pull requests affecting the CSS, JS, images etc in the `src`-- and once merged, the changes will be used to roll out updates to the main directory.

Please **do not** submit any changes to the html files other than those within the `src` directory.

To fix spelling or grammatical errors, make updates to either the English string(s) in the relevant file of the `transifex/resources` directory or any of the **non-english** translations via the Transifex website. If you want to add new strings, append the `.json` file, preserving the JSON format.

Modifying existing strings may cause the already-translated strings to be lost ([more details](https://docs.transifex.com/projects/updating-content#section-using-the-api-or-command-line-client)).

### Translating the website

Translations help us make the software relevant for people who need it around the world.

If you would like to help us translate btcpayserver.org, please [join the team on Transifex](https://www.transifex.com/btcpayserver/btcpayserver-website/dashboard/).

Translations are only handled through Transifex, please do not create a pull request for translations.

For more information on contributing by translating, [check the translation guides](https://docs.btcpayserver.org/Contribute/ContributeTranslate/)

Translators can opt-in to be notified when new strings require translating for a language they're subscribed to.

We used a 90% minimum threshold for translations.

## How to build

Prerequisites:

- [Node.js](https://nodejs.org/en/) >= 10
- Create a `.env` file containing the API token for Transifex (`TRANSIFEX_TOKEN="my_api_token"`)

Setup:

```sh
# Install the dependencies
npm install

# Download the translations – this is mandatory for the rest to work
npm run init
```

Build:

```sh
# Build the site locally and start dev server
npm start

# Build the site for production
npm run prod
```
