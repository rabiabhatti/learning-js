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
            const entry = await db.time.create({ id })
            console.log('entry', entry)
            res.status(201).send(entry.dataValues)
        } catch (e) {
            console.log(e)
            res.status(400).send(e)
        }
    },

    async deleteLastEntry(req, res) {
        try {
            db.time
                .findAll({
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                })
                .then(async (result) => {
                    const { id } = result[0].dataValues
                    try {
                        await db.time.destroy({ where: { id } })
                        res.status(201).send({ id })
                    } catch (e) {
                        console.log(e)
                        res.status(400).send(e)
                    }
                })
        } catch (e) {
            console.log(e)
            res.status(400).send(e)
        }
    },
}
