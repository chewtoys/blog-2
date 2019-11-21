const pool = require('./pool')
const logs = require('./../log')
const jwt = require('jsonwebtoken')

class Login {
  constructor() {}
  login(param) {
    return new Promise((resolve, reject) => {
      let decode = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXBhbiIsInBhc3N3b3JkIjoiMTk4ODg1a3VvIiwiaWF0IjoxNTcxMjkxODMwLCJleHAiOjE1NzEyOTU0MzB9.zaNjhpcF2k8f3mN3PSenwuoL0X6T3p9PwxzwDSP-0KU", 'blog')
      console.log(decode)
      pool.query(`select name, password from user where name='${param.name}' and password='${param.password}'`, function (e, res, fields) {
        if (e) {
          logs.createLogs(e, 'fail')
          throw e
        } else {
          let secret = 'blog'; // 密钥
          var token = jwt.sign({
            name: param.name,
            password: param.password
          }, secret, {
            expiresIn: '1h'
          });
          console.log('token', token)
          logs.createLogs(res, 'success')
          resolve(res.length)
        }
      });
    })

  }
}

module.exports = new Login()