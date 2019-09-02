// var mysql = require('mysql');
// var config = require('./config')

// // console.log(config, 'config')

// var pool  = mysql.createPool({
//   host     : config.database.HOST,
//   user     : config.database.USERNAME,
//   password : config.database.PASSWORD,
//   database : config.database.DATABASE
// });

// // console.log('pool', pool)
// class Mysql {
//   constructor () {

//   }
//   query () {
//     return new Promise((resolve, reject) => {
//       pool.query('SELECT * from user', function (error, results, fields) {
//           if (error) {
//               throw error
//           };
//           console.log('results', results)
//           resolve(results)
//           // console.log('The solution is: ', results[0].solution);
//       });
//     })
     
//   }
// }

// module.exports = new Mysql()