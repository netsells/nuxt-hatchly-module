const merge = require('lodash/merge');

const defaults = {
    pwa: true,
    bootstrap: true,
    styleResources: true,
    snippets: true,
    navigation: true,
    files: true,
};

const mergeDefaults = (config, hatchlyOptions) => {
    return merge(defaults, hatchlyOptions, config);
};

module.exports = {
    defaults,
    mergeDefaults,
};
