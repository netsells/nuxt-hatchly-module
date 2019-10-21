import Vue from 'vue';

/**
 * Format the nav url
 *
 * @param {String} url
 *
 * @returns {String}
 */
const urlFormatter = (url) => {
    return url
        // As the urls come from an api, the urls will have the
        // api url as the base. We'll remove this
        .replace(process.env.API_URL, '')
        // If the url was the homepage, we'll default to a slash
        || '/';
};

/**
 * Recursively Format each nav item so it's more usable
 *
 * @param item
 *
 * @returns {{children: *, url: *}}
 */
const navItemFormatter = (item) => ({
    ...item,
    url: urlFormatter(item.url),
    children: item.children.map(navItemFormatter),
});

const registerStoreModule = ({ store }) => {
    store.registerModule('navigations', {
        namespaced: true,

        state: () => ({
            navs: [],
        }),

        getters: {
            /**
             * Find the navigation in the store
             *
             * @param {Array} navs
             *
             * @returns {function(*): *}
             */
            find({ navs }) {
                return (key) => navs.find((nav) => nav.key === key);
            },
        },

        mutations: {
            /**
             * Set the data in the store
             *
             * @param {Object} state
             * @param {Array} data
             */
            set(state, data) {
                state.navs = data;
            },
        },

        actions: {
            /**
             * Fetch the navigation data from the api
             *
             * @param {Function} commit
             *
             * @returns {Promise<void>}
             */
            async get({ commit }) {
                const { data } = await this.$axios.$get('navigation/groups');

                let requests = data.map(({ key}) => this.$axios.$get(`navigation/groups/${ key }/items`));

                const result = await Promise.all(requests);

                result.forEach((nav, i) => {
                    data[i].items = nav.data.map(navItemFormatter);
                });

                commit('set', data);
            },
        },
    });
};

export const registerGlobalMixin = ({ store }) => {
    Vue.mixin({
        methods: {
            /**
             * Find a nav by key
             *
             * @param {String} key
             *
             * @returns {Array}
             */
            $nav(key) {
                const find = store.getters['navigations/find'];

                const nav = find(key);

                return (nav || {}).items || [];
            },
        },
    });
};

/**
 * Fetch the data from the api
 *
 * @param {Object} store
 *
 * @returns {Promise<*>}
 */
const fetchData = async ({ store }) => {
    if (process.server) {
        try {
            return await store.dispatch('navigations/get');
        } catch (e) {
            console.warn('Navigation module not registered or is returning an error code.');
        }
    }
};

/**
 * Register the snippets module
 *
 * @param {Object} context
 *
 * @returns {Promise<void>}
 */
export const register = async (context) => {
    registerStoreModule(context);

    await fetchData(context);

    registerGlobalMixin(context);
};
