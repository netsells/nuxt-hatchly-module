const defaults = {
    pwa: true,
    apollo: true,
    proxy: true,
    gtm: true,
    bootstrap: true,
    sassResourcesLoader: true,
};

const mergeDefaults = (config) => {
    return Object.assign({}, defaults, config);
};

module.exports = {
    defaults,
    mergeDefaults,
};
