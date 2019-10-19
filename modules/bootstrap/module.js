import { hasDependency } from '../../lib/helpers';
const moduleName = 'bootstrap-vue/nuxt';

module.exports = function bootstrapModule(options) {
    if (!hasDependency(moduleName)) {
        return {
            error: `${ moduleName } not installed`,
        };
    }

    this.requireModule([moduleName, {
        // We pull in our own bootstrap so we don't
        // want the styles pulling in twice
        css: false,
    }]);

    return true;
};
