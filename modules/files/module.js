const { hasDependency } = require('../../lib/helpers');
const { resolve } = require('path');

module.exports = function filesModule(options) {
    const path = options.path || '/file';
    const host = options.host || process.env.API_URL;

    const handler = (req, res) => {
        res.writeHead(301, {
            Location: [host, path, req.url].join(''),
        });

        res.end();
    };

    this.addServerMiddleware({ path, handler });

    return true;
};
