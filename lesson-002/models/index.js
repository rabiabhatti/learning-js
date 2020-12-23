/* eslint-disable import/no-dynamic-require */
const fs = require('fs')
const path = require('path')
const { Sequelize } = require('sequelize')
const settings = require('../settings')

const db = {}
const basename = path.basename(__filename)

const sequelize = new Sequelize(
    [
        'postgres://',
        settings.get('DATABASE_USER'),
        ':',
        settings.get('DATABASE_PASSWORD'),
        '@',
        settings.get('DATABASE_HOST'),
        ':',
        settings.get('DATABASE_PORT'),
        '/',
        settings.get('DATABASE_NAME'),
    ].join('')
)

fs.readdirSync(__dirname)
    .filter(
        (file) =>
            !file.startsWith('.') && file !== basename && file.endsWith('.js')
    )
    .forEach((file) => {
        // eslint-disable-next-line global-require
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        )
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
