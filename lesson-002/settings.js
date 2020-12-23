const path = require('path')
const nconf = require('nconf')

nconf
    .env()
    .file('development', {
        file: path.join(__dirname, '.', 'config', 'env.json'),
    })
    .defaults({
        NODE_ENV: 'development',
    })

module.exports = nconf
