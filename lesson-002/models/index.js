// const { Pool } = require('pg')

// const pool = new Pool({
//     user: 'shw',
//     host: 'localhost',
//     database: 'shw',
//     password: 'shw',
//     port: 5432,
// })

// const getAllEntries = (request, response) => {
//     pool.query('SELECT * FROM times', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }

// const createEntry = (request, response) => {
//     const { id } = request.body

//     pool.query('INSERT INTO times (id) VALUES ($1)', [id], (error) => {
//         if (error) {
//             throw error
//         }
//         getAllEntries(request, response)
//         // response.status(201).send(`Entry added: ${results}`)
//     })
// }

// const deleteMostRecent = (request, response) => {
//     pool.query(
//         'DELETE FROM times WHERE id = (SELECT id FROM times ORDER BY id DESC LIMIT 1)',
//         (error) => {
//             if (error) {
//                 throw error
//             }
//             getAllEntries(request, response)
//             // response.status(200).send(`Time deleted: ${results}`)
//         }
//     )
// }

// module.exports = {
//     getAllEntries,
//     createEntry,
//     deleteMostRecent,
// }

const { Sequelize } = require('sequelize')
const settings = require('../settings')

const db = {}

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

// const db = new Sequelize('lesson002', 'rabia', 'rabia', {
//     dialect: 'postgres',
//     host: 'localhost',
//     port: 5432,
// })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
