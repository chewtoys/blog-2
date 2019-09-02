const pool = require('./pool')

class Register {
  constructor() {

  }
  query(param) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO `user` (name, password) VALUES ("' + param.userName + '", "' + param.password + '")', function (error, results, fields) {
        if (error) {
          throw error
        };
        resolve(results)
      });
    })

  }
}

module.exports = new Register()