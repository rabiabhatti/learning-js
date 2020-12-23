const db = require('../models')

module.exports = {
    async getAllTimes(req, res) {
        try {
            const collection = await db.time.findAll()
            res.status(201).send(collection)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },

    async createTime(req, res) {
        const { id } = req.body
        try {
            await db.time.create({ id })
            const collection = await db.time.findAll()
            res.status(201).send(collection)
        } catch (e) {
            console.log(e)
            res.status(400).send(e)
        }
    },
}
