import Vue from 'vue';
import get from 'lodash/get';

const registerStoreModule = ({ store }) => {
    store.registerModule('snippets', {
        namespaced: true,

        state: () => ({
            snippets: [],
        }),

        mutations: {
            /**
             * Set the data in the store
             *
             * @param {Object} state
             * @param {Array} data
             */
            set(state, data) {
                state.snippets = data;
            },
        },

        getters: {
            /**
             * Find the snippet in the store
             *
             * @param snippets
             *
             * @returns {function(*): *}
             */
            find({ snippets }) {
                return (key) => snippets.find((snippet) => snippet.key === key);
            },
        },

        actions: {
            async get({ commit }) {
                const { data } = await this.$axios.$get('snippets');

                commit('set', data);
            },
        },
    });
};

/**
 * Register the mixin to enable easy access to the data
 */
export const registerGlobalMixin = () => {
    Vue.mixin({
        methods: {
            $snippet(key) {
                const find = this.$store.getters['snippets/find'];

                return get(find(key), 'value');
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
            return await store.dispatch('snippets/get');
        } catch (e) {
            console.warn('Snippets module not registered or is returning an error code.');
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
