# btcpayserver.org source files

### Notes:
This document is an early draft.

The files in this directory are used in conjunction with the transifex resources to make the btcpayserver.org website.
Make pull requests here --affecting the css, js, images etc.-- and once merged, they will be used to roll out updates to the main directory.

More details on this workflow and how to build the site locally to come. 

### transifex-master
This directory contains the master `.json` file with english strings used as a transifex resource.
Append the `.json` file, preserving the JSON format, to allow transifex to read it for updates automatically.
Modifying existing strings may cause the already-translated strings to be lost (see: https://docs.transifex.com/projects/updating-content#section-using-the-api-or-command-line-client for more details).
