const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// const db = require('./db')
const { sequelize } = require('./models')

const app = express()

const PORT = 8080

async function start() {
    app.use(bodyParser.json())

    app.use(express.static(path.join(__dirname, 'public')))

    app.get('/', (_req, res) => {
        res.sendFile(path.join(`${__dirname}/public/index.html`))
    })

    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    // try {
    // } catch (error) {
    //     console.error('Unable to connect to the database:', error)
    // }

    // app.get('/times', db.getAllEntries)
    // app.post('/times', db.createEntry)
    // app.delete('/times', db.deleteMostRecent)

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`App is listening on port ${PORT}`)
    })
}

start().catch((e) => {
    console.log(e)
})
