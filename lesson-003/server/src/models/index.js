/* eslint-disable import/no-dynamic-require */

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import sequelizeConfig from '../../config/config.json'

const env = process.env.NODE_ENV || 'development'
const config = sequelizeConfig[env]
const db = {}

let sequelize
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    )
}

fs.readdirSync(__dirname)
    .filter(
        (file) =>
            !file.startsWith('.') && file !== 'index.js' && file.endsWith('.js')
    )
    .forEach((file) => {
        // eslint-disable-next-line global-require
        const model = require(path.join(__dirname, file))(sequelize, Sequelize)
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize


module.exports = db
