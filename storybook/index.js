import logger from '../lib/logger';

/**
 * Setup the various nuxt modules storybook integrations.
 *
 * @param {object} config
 * @param {Array} config.modules
 * @param {object} config.store
 * @param {Array} config.navs
 * @param {Array} config.snippets
 */
export default ({ modules, store, navs, snippets }) => {
    if (
        modules.includes('navigation')
        || modules.includes('navigations')
    ) {
        const navigationModule = require('@hatchly/nuxt-navigation-module/storybook');

        if (!store) {
            logger.error('Please provide the `store` object to register the navs module');
        }

        if (!navs) {
            logger.error('Please provide the `navs` fixture to populate the snippets store');
        }

        if (store && navs) {
            navigationModule({
                store,
                navs,
            });
        }
    }

    if (modules.includes('snippets')) {
        const snippetsModule = require('@hatchly/nuxt-snippets-module/storybook');

        if (!store) {
            logger.error('Please provide the `store` object to register the snippets module');
        }

        if (!snippets) {
            logger.error('Please provide the `snippets` fixture to populate the snippets store');
        }

        if (store && snippets) {
            snippetsModule({
                store,
                snippets,
            });
        }
    }

    if (modules.includes('pages')) {
        require('@hatchly/nuxt-pages-module/storybook');
    }
};
