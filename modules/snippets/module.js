const { hasDependency } = require('../../lib/helpers');
const { resolve } = require('path');

module.exports = function snippetsModule(options) {
    if (!hasDependency('@nuxtjs/axios')) {
        return {
            error: '@nuxtjs/axios not installed',
        };
    }

    if (!this.options.store) {
        return {
            error: 'Enable vuex store by creating `store/index.js`.'
        };
    }

    this.addTemplate({
        src: resolve(__dirname, './index.js'),
        options,
        fileName: './hatchly/modules/snippets/index.js',
    });

    return true;
};
