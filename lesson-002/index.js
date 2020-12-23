const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const { sequelize } = require('./models')

const PORT = 8080

async function start() {
    const app = express()
    app.use(bodyParser.json())
    app.use(express.static(path.join(__dirname, 'public')))

    app.get('/', (_req, res) => {
        res.sendFile(path.join(`${__dirname}/public/index.html`))
    })

    try {
        await sequelize.authenticate()
        // eslint-disable-next-line no-console
        console.log('Connection has been established successfully.')
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unable to connect to the database:', error)
    }
    // app.get('/times', db.getAllEntries)
    // app.post('/times', db.createEntry)
    // app.delete('/times', db.deleteMostRecent)

    require('./routes')(app)

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`App is listening on port ${PORT}`)
    })
}

start().catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e)
})
