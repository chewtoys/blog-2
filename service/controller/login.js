const pool = require('./pool')

class Login {
  constructor() {

  }
  login(param) {
    return new Promise((resolve, reject) => {
      pool.query(`select name, password from user where name='${param.name}' and password='${param.password}'`, function (error, results, fields) {
        if (error) {
          throw error
        };
        resolve(results.length)
      });
    })

  }
}

module.exports = new Login()