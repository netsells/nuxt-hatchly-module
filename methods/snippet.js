/**
 * Return a snippet value
 *
 * @param {String} name
 *
 * @returns {String}
 */
export function snippet(name) {
    return this.$store.state.snippets.snippets[name];
}
