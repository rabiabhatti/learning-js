const express = require('express') 
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

const db = require('./db')

const PORT = 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/times', db.getAllEntries)
app.post('/times', db.createEntry)
app.delete('/times', db.deleteMostRecent)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
