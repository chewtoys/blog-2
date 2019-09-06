const pool = require('./pool')
const moment = require('moment')
const logs = require('./../log')

class Friend {
  constructor() {}

  queryList(param) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM friend LIMIT 10`, (e, res, fields) => {
        if (e) {
          logs.createLogs(e, 'fail')
          throw e
        } else {
          if (res.length) {
            res.forEach(item => {
              item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm:ss");
              item.update_time = moment(item.update_time).format("YYYY-MM-DD HH:mm:ss");
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
      pool.query('SELECT COUNT(*) FROM friend', (e, res, fields) => {
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

  addFriend(param) {
    const {
      name,
      link,
      phone,
      thumbnail,
      remark
    } = param
    return new Promise((resolve, reject) => {
      pool.query(`insert into friend (name, link, create_time, phone, thumbnail, remark) values ("${name}", "${link}", now(), "${phone}", "${thumbnail}", "${remark}")`, (e, res, fields) => {
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

  modifyFriend(param) {
    const {
      id,
      name,
      link,
      phone,
      thumbnail,
      remark
    } = param
    return new Promise((resolve, reject) => {
      pool.query(`update friend set name="${name}", link="${link}", phone="${phone}", thumbnail="${thumbnail}", remark="${remark}", update_time=now() where id=${id}`, (e, res, fields) => {
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

  delFriend(param) {
    const {
      id
    } = param
    return new Promise((resolve, reject) => {
      pool.query(`delete from friend where id=${id}`, (e, res, fields) => {
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

module.exports = new Friend()