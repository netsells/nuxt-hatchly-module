import get from 'lodash/get';

module.exports = {
    /**
     * Set SEO/head metadata
     *
     * @returns {Object}
     */
    head() {
        return {
            title: get(this.page, 'meta_data.title', this.page.title),
            meta: ['description', 'keywords', 'title'].reduce((data, key) => {
                data[key] = data[`og:${key}`] = get(this.page, `meta_data.${key}`) || '';

                return data;
            }, []),
        }
    },
};
