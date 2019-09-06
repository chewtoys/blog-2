const pool = require('./pool')
const moment = require('moment')
const logs = require('./../log')

class Message {
  constructor() {}

  queryList(param) {
    const { row, pageNum } = param
    return new Promise((resolve, reject) => {
      // `SELECT * FROM article order by is_top desc, create_time desc LIMIT ${row * (pageNum -1)}, ${row}`
      // `SELECT a.*, b.title FROM message a LEFT JOIN article b ON a.article_id = b.id order by create_time desc limit ${row * (pageNum -1)}, ${row}`
      pool.query(`SELECT a.*, b.title FROM message a LEFT JOIN article b ON a.article_id = b.id order by create_time desc limit ${row * (pageNum -1)}, ${row}`, (e, res, fields) => {
        if (e) {
          logs.createLogs(e, 'fail')
          throw e
        } else {
          if (res.length) {
            res.forEach(item => {
              item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm:ss");
            })
          }
          logs.createLogs(res, 'success')
          resolve(res)
        }
      })
    })
  }

  queryTotal(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT COUNT(*) FROM message', (e, res, fields) => {
        if (e) {
          logs.createLogs(e, 'fail')
          throw e
        } else {
          logs.createLogs(res, 'success')
          resolve(res[0])
        }
      })
    })
  }
  
  delMessage(param) {
    const {
      id
    } = param
    return new Promise((resolve, reject) => {
      pool.query(`delete from message where id=${id}`, (e, res, fields) => {
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