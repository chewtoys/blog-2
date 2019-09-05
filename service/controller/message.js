const pool = require('./pool')
const logs = require('./../log')

class Message {
  constructor() {}

  query(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM message LIMIT 10', (e, res, fields) => {
        console.log(res)
        if (e) {
          logs.createLogs(e, 'fail')
          throw e
        } else {
          logs.createLogs(res, 'success')
          resolve(res)
        }
      })
    })
  }
}

module.exports = new Message()