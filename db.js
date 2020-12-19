const Pool = require('pg').Pool
const pool = new Pool({
  user: 'shw',
  host: 'localhost',
  database: 'shw',
  password: 'shw',
  port: 5432,
})


const createEntry = (request, response) => {
    const {id} = request.body
  
    pool.query('INSERT INTO times (id) VALUES ($1)', [id], (error, results) => {
      if (error) {
        throw error
      }
      getAllEntries(request, response)
      // response.status(201).send(`Entry added: ${results}`)
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
    pool.query('DELETE FROM times WHERE id = (SELECT id FROM times ORDER BY id DESC LIMIT 1)', (error, results) => {
        if (error) {
          throw error
        }
        getAllEntries(request, response)
        // response.status(200).send(`Time deleted: ${results}`)
    })
    
}

  module.exports = {
    getAllEntries,
    createEntry,
    deleteMostRecent,
  }