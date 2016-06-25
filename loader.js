var requireDirectory = require('require-directory');

module.exports = {
    routes: requireDirectory(module, './server/routes')
}
