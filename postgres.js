const Pool = require('pg').Pool
const pool = new Pool({
  user: 'learning_js',
  host: 'localhost',
  database: 'learning_js_database',
  password: 'learning_js',
  port: 5432,
})


const createEntry = (request, response) => {
    const t = Date.now()
  
    pool.query('INSERT INTO times (date) VALUES ($1)', [t], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Entry added: ${results}`)
    })
}

const getAllEntries = (request, response) => {
    pool.query('SELECT * FROM times', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const deleteMostRecent = (request, response) => {
  
    pool.query('DELETE FROM times ORDER BY id DESC LIMIT 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Time deleted: ${results}`)
    })
}

  module.exports = {
    getAllEntries,
    createEntry,
    deleteMostRecent,
  }