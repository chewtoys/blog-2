const pool = require('./pool')
const logs = require('./../log')
const jwtToken = require('./../token')

class Login {
  constructor() {}
  login(param) {
    return new Promise((resolve, reject) => {
      const token = jwtToken.set({
        name: param.name,
        password: param.password
      })
      console.log('token', token)
      
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