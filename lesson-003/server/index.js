import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

// const { sequelize } = require('./models')

const PORT = 8080
const __dirname = path.resolve()

async function start() {
    const app = express()
    app.use(bodyParser.json())
    app.use(express.static(path.join(__dirname, 'public')))

    app.get('/', (_req, res) => {
        res.sendFile(path.join(`${__dirname}/public/index.html`))
    })

    // try {
    //     await sequelize.authenticate()
    //     console.log('Connection has been established successfully.')
    // } catch (error) {
    //     console.error('Unable to connect to the database:', error)
    // }

    // require('./routes')(app)

    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
    })
}

start().catch((e) => {
    console.log(e)
})
