const { ApolloLink } = require('apollo-link');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache, IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
//const '../queries/prefetch';
const introspectionQueryResultData = require('../fragment-types.json');

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
});

/**
 * Set up the apollo client
 *
 * @returns {{link: ApolloLink, cache: InMemoryCache}}
 */
module.exports = () => {
    const httpLink = new HttpLink({
        uri: `${process.env.APP_URL}/api/pages`,
    });

    // middleware
    const middlewareLink = new ApolloLink((operation, forward) => {
        return forward(operation);
    });

    return {
        link: middlewareLink.concat(httpLink),
        cache: new InMemoryCache({ fragmentMatcher }),
    };
};
