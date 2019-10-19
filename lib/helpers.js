const { resolve } = require('path');

const hasDependency = (name) => {
    try {
        require.resolve(
            resolve(process.env.PWD, 'node_modules', name)
        );
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = {
    hasDependency,
};
