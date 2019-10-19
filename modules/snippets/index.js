import Vue from 'vue';

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
                const { data } = await this.$axios.$get('http://bsg-api.test/navigation/groups');

                for (let i = 0; i < data.length; i++) {
                    const key = data[i].key;
                    const { data: items } = await this.$axios.$get(`http://bsg-api.test/navigation/groups/${ key }/items`);
                    data[i].items = items;
                }

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

                return find(key);
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
        return await store.dispatch('snippets/get');
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
