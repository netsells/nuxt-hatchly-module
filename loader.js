const { defaults } = require('./default-options');
const logger = require('./lib/logger');
const { name } = require('./package.json');

class Loader {
    constructor() {
        this.setupModules();

        logger.log();
        logger.info(`Loading ${ name }`);
    }

    load(key, result) {
        this.modules[key] = {
            ...this.modules[key],
            ...result === true
             ? { enabled: true }
             : result
        };
    }

    setupModules() {
        this.modules = Object.keys(defaults).reduce((options, option) => ({
            ...options,
            [option]: {
                enabled: false,
            },
        }), {});
    }

    table() {
        const formatted = Object.entries(this.modules).reduce((modules, [name, module]) => ({
            ...modules,
            [name]: {
                ...module,
                enabled: module.enabled
                    ? '✅'
                    : '❌'
            },
        }), {});

        console.table(formatted);
    }

    success() {
        logger.success(`${ name } loaded\n`);
    }

    getModules() {
        return this.modules;
    }

    getEnabledModules() {
        return Object.entries(this.modules)
            .filter(([key, { enabled }]) => enabled)
            .reduce((modules, [key, module]) => ({
                ...modules,
                [key]: module,
            }), {});
    }
}

module.exports = Loader;
