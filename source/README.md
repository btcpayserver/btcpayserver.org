# btcpayserver.org source files

### Notes:

This document is still being developed.

The files in this directory are used in conjunction with the transifex resources to make the btcpayserver.org website.
Make pull requests here --affecting the css, js, images etc.-- and once merged, they will be used to roll out updates to the main directory.

Current build process requires a manual build command when a resource is updated.

### transifex-master

This directory contains the master `.json` file with English strings used as a transifex resource.
To fix spelling or grammatical errors make updates to either the English string(s) in the source file here or any of the non-English translations via the transifex website.
Append the `.json` file, preserving the JSON format, to allow transifex to read it for updates automatically.
Modifying existing strings may cause the already-translated strings to be lost (see: https://docs.transifex.com/projects/updating-content#section-using-the-api-or-command-line-client for more details).
