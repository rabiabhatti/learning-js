const express = require('express') 
const app = express()

const PORT = 8080

app.get('/', (req, res) => {
    res.send('Home route')
})

app.get('/route-1', (req, res) => {
    res.send('route-1 response')
})

app.get('/route-2', (req, res) => {
    res.send('route-2 response')
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
