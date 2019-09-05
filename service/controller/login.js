const pool = require('./pool')
const logs = require('./../log')

class Login {
  constructor() {}
  login(param) {
    return new Promise((resolve, reject) => {
      pool.query(`select name, password from user where name='${param.name}' and password='${param.password}'`, function (error, results, fields) {
        if (error) {
          logs.createLogs(e, 'fail')
          throw error
        } else {
          logs.createLogs(res, 'success')
          resolve(results.length)
        }
      });
    })

  }
}

module.exports = new Login()