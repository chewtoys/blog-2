const pool = require('./pool')

class Article {
  constructor() {

  }
  query(param) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM article LIMIT 10', (e, res, fields) => {
        console.log(res)
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
      pool.query('SELECT COUNT(*) FROM article', (e, res, fields) => {
        if (e) {
          throw e
        } else {
          console.log('res', res[0])
          resolve(res[0])
        }
      })
    })
  }

  queryDetail(param) {
    console.log('param', param)
    const {
      id
    } = param
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM `article` WHERE id=' + id + '', (e, res, fields) => {
        console.log(res)
        if (e) {
          throw e
        } else {
          resolve(res[0])
        }
      })
    })
  }

  queryAdd(param) {
    const {
      title,
      type,
      content,
      thumbnail,
      author,
      is_top,
      tag_id,
      sourse
    } = param
    return new Promise((resolve, reject) => {
      // `insert into tag (name, alias, create_time) values ("${name}", "${alias}", now())`
      pool.query(`insert into article (title, type, content, thumbnail, author, create_time, is_top, tag_id, sourse, preview_num) 
      values ("${title}", ${type}, "${content}","${thumbnail}", "${author}", now(), ${is_top}, "${tag_id}", "${sourse}", 0)`, (e, res, fields) => {
        console.log(res)
        if (e) {
          throw e
        } else {
          resolve(res)
        }
      })
    })
  }

  modifyArticle(param) {
    let {
      id,
      title,
      type,
      content,
      thumbnail,
      author,
      is_top,
      tag_id,
      sourse,
      preview_num
    } = param
    preview_num = preview_num ? 1 : preview_num + 1
    console.log(preview_num,'dadadasdasdas')
    return new Promise((resolve, reject) => {
      // `insert into tag (name, alias, create_time) values ("${name}", "${alias}", now())`
      pool.query(`update article set title="${title}", 
      type=${type}, 
      content="${content}", 
      thumbnail="${thumbnail}", 
      author="${author}", 
      update_time=now(), 
      is_top=${is_top}, 
      tag_id="${tag_id}", 
      sourse="${sourse}", 
      preview_num=${preview_num} where id=${id}` , (e, res, fields) => {
        console.log(res)
        if (e) {
          throw e
        } else {
          resolve(res)
        }
      })
    })
  }

  delArticle(param) {
    const { id } = param
    return new Promise((resolve, reject) => {
      // delete from `tag` where id=2
      pool.query(`delete from article where id=${id}`, (e, res, fields) => {
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

module.exports = new Article()