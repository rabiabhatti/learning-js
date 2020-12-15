const express = require('express') 
const bodyParser = require('body-parser')
const app = express()

const db = require('./postgres')

const PORT = 8080

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/route-1', (req, res) => {
    res.send('route-1 response')
})

app.get('/route-2', (req, res) => {
    res.send('route-2 response')
})

app.get('/times', db.getAllEntries)
app.post('/times', db.createEntry)
app.delete('/users', db.deleteMostRecent)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
