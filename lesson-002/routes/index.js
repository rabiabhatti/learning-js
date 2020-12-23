const time = require('./time')

module.exports = (app) => {
    app.get('/times', time.getAllTimes)
    app.post('/times', time.createTime)
}
