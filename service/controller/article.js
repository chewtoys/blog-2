const pool = require('./pool')
const moment = require('moment')

class Article {
  constructor() {

  }
  query(param) {
    // console.log('param', param)
    const {
      row,
      pageNum
    } = param
    console.log(row, pageNum)
    console.log(`SELECT * FROM article order by is_top desc, create_time desc LIMIT ${row * pageNum},${pageNum}`)
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM article order by is_top desc, create_time desc LIMIT ${row * (pageNum -1)},${row}`, (e, res, fields) => {
        console.log('res', res)
        if (e) {
          throw e
        } else {
          if(res.length) {
            res.forEach(item => {
              item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm:ss");
              console.log('item create item', item.create_time)
            })
          }
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
        console.log('res[0]', res[0])
        if (e) {
          throw e
        } else {
          res[0].create_time = moment(res[0].create_time).format("YYYY-MM-DD HH:mm:ss");
          resolve(res[0])
          addPreviewNum(res[0].preview_num + 1);
        }
      })
      // 访问次数加1
      function addPreviewNum(num) {
        pool.query(`update article set preview_num=${num} where id=${id}`, (e, res, fields) => {
          // if (e) {
          //   throw e
          // } else {
          //   resolve(res)
          // }
        })
      }
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
      sourse,
      abstract
    } = param
    return new Promise((resolve, reject) => {
      // `insert into tag (name, alias, create_time) values ("${name}", "${alias}", now())`
      pool.query(`insert into article (title, type, content, thumbnail, author, create_time, is_top, tag_id, sourse, preview_num, abstract) 
      values ("${title}", ${type}, "${content}","${thumbnail}", "${author}", now(), ${is_top}, "${tag_id}", "${sourse}", 0, "${abstract}")`, (e, res, fields) => {
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
      preview_num,
      abstract
    } = param
    preview_num = preview_num ? 1 : preview_num + 1
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
      preview_num=${preview_num},
      abstract= "${abstract}" where id=${id}`, (e, res, fields) => {
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
    const {
      id
    } = param
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