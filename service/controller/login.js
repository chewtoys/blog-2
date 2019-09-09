const pool = require('./pool')
const logs = require('./../log')

class Login {
  constructor() {}
  login(param) {
    return new Promise((resolve, reject) => {
      pool.query(`select name, password from user where name='${param.name}' and password='${param.password}'`, function (e, res, fields) {
        if (e) {
          logs.createLogs(e, 'fail')
          throw e
        } else {
          logs.createLogs(res, 'success')
          resolve(res.length)
        }
      });
    })

  }
}

module.exports = new Login()