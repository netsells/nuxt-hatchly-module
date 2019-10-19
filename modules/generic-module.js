import { hasDependency } from '../lib/helpers';

module.exports = function genericModule(name) {
    if (!hasDependency(name)) {
        return {
            error: `${ name } not installed`,
        };
    }

    this.requireModule(name);

    return true;
};
