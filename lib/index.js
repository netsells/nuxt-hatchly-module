import pkg from '../package.json';

/**
 * Hatchly nuxt module constructor.
 */
function HatchlyModule() {
    const enabledModules = this.options.hatchly.modules || [
        'navigation',
        'pages',
        'files',
        'newsletter',
        'snippets',
        'navigation',
        'redirects',
    ];

    /**
     * Check whether a module is enabled in the config.
     *
     * @param {string} name
     *
     * @returns {boolean}
     */
    const moduleEnabled = (name) => enabledModules.includes(name);

    if (
        moduleEnabled('navigation')
        || moduleEnabled('navigations')
    ) {
        enabledModules.push('navigation');
    }

    if (moduleEnabled('pages')) {
        enabledModules.push('pages');
        enabledModules.push('files');
    }

    if (moduleEnabled('files')) {
        enabledModules.push('files');
    }

    if (moduleEnabled('newsletter')) {
        enabledModules.push('newsletter');
    }

    if (moduleEnabled('snippets')) {
        enabledModules.push('snippets');
    }

    if (moduleEnabled('navigation')) {
        enabledModules.push('navigation');
    }

    if (moduleEnabled('redirects')) {
        enabledModules.push('redirects');
    }

    [...new Set(enabledModules)].forEach((mod) => {
        this.registerModule(`@hatchly/nuxt-${ mod }-module`);
    });
};

HatchlyModule.meta = pkg;

export default HatchlyModule;

