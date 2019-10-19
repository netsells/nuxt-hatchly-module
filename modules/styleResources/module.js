import { hasDependency } from '../../lib/helpers';
import { resolve, relative } from 'path';
import logger from '../../lib/logger';
const moduleName = '@nuxtjs/style-resources';

const getConfigDirectory = function() {
    const configFile = this.options._nuxtConfigFile;
    let configDir = configFile.split('/');
    configDir.pop();

    return configDir.join('/');
};

module.exports = function styleResourcesModule(options) {
    if (!hasDependency(moduleName)) {
        return {
            error: `${ moduleName } not installed`,
        };
    }

    const resolver = (this.nuxt.resolver || this.nuxt);

    this.options.styleResources = {
        scss: [],
        ...this.options.styleResources || {},
    };

    const addResource = (path) => this.options.styleResources.scss.push(path);

    if (resolver.resolveAlias('~assets/scss/variables.scss')) {
        addResource('~assets/scss/variables.scss');
        logger.warn('~assets/scss/variables.scss should be renamed to ~assets/scss/_variables.scss');
    } else if (resolver.resolveAlias('~assets/scss/_variables.scss')) {
        addResource('~assets/scss/_variables.scss');
    }

    if (this.options.hatchly.bootstrap) {
        addResource(
            relative(
                getConfigDirectory.call(this),
                resolve(process.env.PWD, 'node_modules/bootstrap', 'scss/mixins/**/*.scss')
            )
        );
    }

    addResource('~assets/scss/mixins/**/*.scss');

    this.requireModule(moduleName);

    return true;
};
