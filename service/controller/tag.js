const pool = require('./pool')
const logs = require('./../log')

class Tag {
  constructor() {}

  query(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM tag LIMIT 10', (e, res, fields) => {
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

  queryTotal(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT COUNT(*) FROM tag', (e, res, fields) => {
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

  addtag(param) {
    const {
      name,
      alias
    } = param
    return new Promise((resolve, reject) => {
      pool.query(`insert into tag (name, alias, create_time) values ("${name}", "${alias}", now())`, (e, res, fields) => {
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

  modifyTag(param) {
    const {
      name,
      alias,
      id
    } = param
    return new Promise((resolve, reject) => {
      pool.query(`update tag set name="${name}", alias="${alias}" where id=${id}`, (e, res, fields) => {
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

  delTag(param) {
    const {
      id
    } = param
    return new Promise((resolve, reject) => {
      pool.query(`delete from tag where id=${id}`, (e, res, fields) => {
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

module.exports = new Tag()