const pool = require('./pool')

class Banner {
  constructor() {

  }
  query(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM message LIMIT 10', (e, res, fields) => {
        console.log(res)
        if (e) {
          throw e
        } else {
          resolve(res)
        }
      })
      // pool.query('SELECT name, password FROM `user` WHERE name ="' + param.userName + '" AND password = "' + param.passWord + '"', function (error, results, fields) {
      //   if (error) {
      //     throw error
      //   };
      //   resolve(results)
      // });
    })

  }
}

module.exports = new Banner()