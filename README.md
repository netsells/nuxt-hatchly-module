# @netsells/nuxt-hatchly

> Nuxt module for integrating with Hatchly-based web platforms

## Features

- Automatic retrieval of navigations, and helper method for utilising the response data
- Automatic retrieval of snippets, and helper method for utilising the response data
- Automatic setup of common modules with sane defaults:
    - `bootstrap-vue`
        - `css: false` so that styles aren't pulled in twice
    - `@nuxtjs/style-resources`
    - `@nuxtjs/pwa`
    
## Usage

Install the dependencies using the following command:

```sh
yarn add @netsells/nuxt-hatchly
```

Add the module to your `modules` array in your nuxt config file:

```js
modules: [
    '@netsells/nuxt-hatchly',
],
```

## Future Features

- [] Axios module
- [] Apollo module
