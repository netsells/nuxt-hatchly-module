# @netsells/nuxt-hatchly

> Nuxt module for integrating with Hatchly-based web platforms

## Features

This module sets up the various official hatchly Nuxt integration modules:

* [@hatchly/nuxt-files-module](https://npmjs.com/package/@hatchly/nuxt-files-module)
* [@hatchly/nuxt-navigation-module](https://npmjs.com/package/@hatchly/nuxt-navigation-module)
* [@hatchly/nuxt-newsletter-module](https://npmjs.com/package/@hatchly/nuxt-newsletter-module)
* [@hatchly/nuxt-pages-module](https://npmjs.com/package/@hatchly/nuxt-pages-module)
* [@hatchly/nuxt-redirects-module](https://npmjs.com/package/@hatchly/nuxt-redirects-module)
* [@hatchly/nuxt-snippets-module](https://npmjs.com/package/@hatchly/nuxt-snippets-module)

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

By default it will register all of the modules, but you can make it only register specific modules using the `hatchly.modules` array in your nuxt config:

```js
hatchly: {
    modules: [
        'pages', 
        'snippets',
        // etc.
    ],
},
```

For module specific config options, check the various modules own documentation.
