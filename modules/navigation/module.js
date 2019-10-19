const { resolve } = require('path');

module.exports = function navigationModule(options) {
    if (!this.options.store) {
        return {
            error: 'Enable vuex store by creating `store/index.js`.'
        };
    }

    this.addTemplate({
        src: resolve(__dirname, './index.js'),
        options,
        fileName: './hatchly/modules/navigation/index.js',
    });

    return true;
};
