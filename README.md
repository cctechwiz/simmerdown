# Simmerdown

> A simple site for managing recipes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Netlify Status](https://api.netlify.com/api/v1/badges/dac1289c-526c-4f6f-9809-d1d21bdeb781/deploy-status)](https://app.netlify.com/sites/simmerdown/deploys)

## Dependencies

### Accounts

#### Netlify Account

* Create Netlify Site for this repo
* Enable and configure Netlify Identity feature

#### FaunaDB Account

* Create Database
* Upload GraphQL Schema from repo (`/schema.gql`)
* Create security Key with admin role
* Copy FAUNA_SERVER_KEY into Netlify env vars

### Tools

`npm`

`netlify-cli`

## Building

```bash
git clone <repo>
netlify link # Select site created for this repo
npm install
netlify dev # Run local dev server
```
