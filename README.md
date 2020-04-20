# btcpayserver.org

The official website repository of [BTCPay Server project](https://github.com/btcpayserver/btcpayserver/).

## Contributing

Feel free to contribute ideas, code or content to improve the website.

Prior to submitting a major pull-request, make sure to discuss the changes with the community on [#website channel on Mattermost](https://chat.btcpayserver.org/btcpayserver/channels/website) to avoid duplicating the work.

If you're a developer looking to help, but you're not sure where to begin, check the `good first issue` label, which contains small pieces of work that have been specifically flagged as being friendly to new contributors.

Please do not open issues not related to the website in this repository. If you have an issue with BTCPay Server software, open an issue in an [appropriate repository](https://github.com/btcpayserver/btcpayserver/issues).

### Source files

All changes to the website should be applied in the `source` folder.

The files in the `source` are used in conjunction with the Transifex resources to make the btcpayserver.org website.

Create pull requests affecting the css, js, images etc in the `source`-- and once merged, the changes will be used to roll out updates to the main directory.

To fix spelling or grammatical errors, make updates to either the English string(s) in the relevant file of the `source` directory or any of the **non-English** translations via the Transifex website.

Please **do not** submit any changes to the html files other than those within the `source` directory.

### Translating the website

Translations help us make the software relevant for people who need it around the world.

If you would like to help us translate btcpayserver.org, please [join the team on Transifex](https://www.transifex.com/btcpayserver/btcpayserver-website/dashboard/).

Translations are only handled through Transifex, please do not create a pull request for translations.

For more information on contributing by translating, [check the translation guides](https://docs.btcpayserver.org/support-and-community/translate)

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

### transifex-master

This directory contains the master `.json` file with english strings used as a transifex resource.
Append the `.json` file, preserving the JSON format, to allow transifex to read it for updates automatically.
Modifying existing strings may cause the already-translated strings to be lost (see: https://docs.transifex.com/projects/updating-content#section-using-the-api-or-command-line-client for more details).
