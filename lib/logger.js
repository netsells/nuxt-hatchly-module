const consola = require('consola');
const { name } = require('../package.json');
const logger = consola.withScope(name);

export default logger;
