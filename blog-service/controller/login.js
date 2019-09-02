const pool = require('./pool')

class Login {
  constructor() {

  }
  query(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT name, password FROM `user` WHERE name ="' + param.userName + '" AND password = "' + param.passWord + '"', function (error, results, fields) {
        if (error) {
          throw error
        };
        resolve(results)
      });
    })

  }
}

module.exports = new Login()