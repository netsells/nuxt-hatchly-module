const { resolve } = require('path');
const { mergeDefaults } = require('./default-options');
const navigationModule = require('./modules/navigation/module');
const bootstrapModule = require('./modules/bootstrap/module');
const styleResourcesModule = require('./modules/styleResources/module');
const snippetsModule = require('./modules/snippets/module');
const genericModule = require('./modules/generic-module');
const loader = new (require('./loader'));

module.exports = function HatchlyModule(options = {}) {
    this.options.hatchly = options = mergeDefaults(options, this.options.hatchly);

    this.options.css.push('~assets/scss/app.scss');

    if (options.pwa) {
        loader.load(
            'pwa',
            genericModule.call(this, '@nuxtjs/pwa', options.pwa)
        );
    }

    if (options.bootstrap) {
        loader.load(
            'bootstrap',
            bootstrapModule.call(this, options.bootstrap)
        );
    }

    if (options.styleResources) {
        loader.load(
            'styleResources',
            styleResourcesModule.call(this, options.styleResources)
        );
    }

    if (options.navigation) {
        loader.load(
            'navigation',
            navigationModule.call(this, options.navigation)
        );
    }

    if (options.snippets) {
        loader.load(
            'snippets',
            snippetsModule.call(this, options.snippets)
        );
    }

    loader.table();

    const { dst } = this.addTemplate({
        src: resolve(__dirname, 'plugin.js'),
        options: {
            modules: loader.getEnabledModules(),
        },
    });

    this.options.plugins.push(resolve(this.options.buildDir, dst));

    loader.success();
};

module.exports.meta = require('./package.json');
