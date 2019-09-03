const pool = require('./pool')

class Banner {
  constructor() {}

  query(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM tag LIMIT 10', (e, res, fields) => {
        if (e) {
          throw e
        } else {
          resolve(res)
        }
      })
    })
  }

  queryTotal(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT COUNT(*) FROM tag', (e, res, fields) => {
        if (e) {
          throw e
        } else {
          console.log('res', res[0])
          resolve(res[0])
        }
      })
    })
  }

  addtag(param) {
    const { name, alias } = param
    return new Promise((resolve, reject) => {
      pool.query(`insert into tag (name, alias, create_time) values ("${name}", "${alias}", now())`, (e, res, fields) => {
        if (e) {
          throw e
        } else {
          console.log('res', res)
          resolve(res)
        }
      })
    })
  }

  modifyTag(param) {
    const { name, alias, id } = param
    return new Promise((resolve, reject) => {
      // update `tag` set name='xiugai', alias='xiu' where id=2
      pool.query(`update tag set name="${name}", alias="${alias}" where id=${id}`, (e, res, fields) => {
        if (e) {
          throw e
        } else {
          console.log('res', res)
          resolve(res)
        }
      })
    })
  }

  delTag(param) {
    const { id } = param
    return new Promise((resolve, reject) => {
      // delete from `tag` where id=2
      pool.query(`delete from tag where id=${id}`, (e, res, fields) => {
        if (e) {
          throw e
        } else {
          console.log('res', res)
          resolve(res)
        }
      })
    })
  }
}

module.exports = new Banner()