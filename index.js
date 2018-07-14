const path = require('path');

module.exports = function HatchlyModule() => {
    this.addPlugin(path.resolve(__dirname, 'plugin.js'));
}

module.exports.meta = require('./package.json');
