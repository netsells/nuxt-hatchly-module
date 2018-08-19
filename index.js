const path = require('path');
const { mergeDefaults } = require('./default-options');

module.exports = function HatchlyModule(moduleConfig = {}) {
    moduleConfig = mergeDefaults(moduleConfig);

    // Add default modules
    if (moduleConfig.pwa) {
        this.requireModule('@nuxtjs/pwa');
    }
    if (moduleConfig.apollo) {
        this.requireModule('@nuxtjs/apollo');
        this.config.apollo = {
            clientConfigs: {
                default: require('./modules/@nuxtjs/apollo/network-interfaces/default.js'),
            },
        };
    }
    if (moduleConfig.proxy) {
        this.requireModule('@nuxtjs/proxy');
        this.config.proxy = {
            '/api': { target: process.env.API_BASE, changeOrigin: true },
            '/admin': { target: process.env.API_BASE, changeOrigin: true },
            '/file': { target: process.env.API_BASE, changeOrigin: true },
        };
    }
    if (moduleConfig.gtm) {
        this.requireModule(['@nuxtjs/google-tag-manager', {
            id: process.env.GTM_KEY || '',
            pageTracking: true,
        }]);
    }
    if (moduleConfig.bootstrap) {
        this.requireModule(['bootstrap-vue/nuxt', {
            css: false,
        }]);
    }
    if (moduleConfig.sassResourcesLoader) {
        this.requireModule('nuxt-sass-resources-loader');
    }

    this.addPlugin(path.resolve(__dirname, 'plugin.js'));

    console.log(this.options)
};

module.exports.meta = require('./package.json');
