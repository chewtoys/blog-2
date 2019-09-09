 const pool = require('./pool')
 const moment = require('moment')
 const logs = require('./../log')

 class Message {
   constructor() {}

   queryList(param) {
     const {
       row,
       pageNum,
       article_id
     } = param
     return new Promise((resolve, reject) => {
       let queryArticleId = ''
       if (article_id) {
         queryArticleId = 'WHERE article_id=' + article_id
       }
       // `SELECT * FROM article order by is_top desc, create_time desc LIMIT ${row * (pageNum -1)}, ${row}`
       // `SELECT a.*, b.title FROM message a LEFT JOIN article b ON a.article_id = b.id order by create_time desc limit ${row * (pageNum -1)}, ${row}`
       pool.query(`SELECT a.*, b.title FROM message a LEFT JOIN article b ON a.article_id = b.id ${queryArticleId} order by create_time desc limit ${row * (pageNum -1)}, ${row}`, (e, res, fields) => {
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
     const {
       article_id
     } = param
     let queryArticleId = ''
     if (article_id) {
       queryArticleId = 'WHERE article_id=' + article_id
     }
     return new Promise((resolve, reject) => {
       pool.query(`SELECT COUNT(*) FROM message ${queryArticleId}`, (e, res, fields) => {
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

   addMessage(param) {
     let {
       nick,
       content,
       type,
       article_id,
       websister_name,
       websister_link
     } = param
     if (!nick) {
      nick = ''
     }
     if (!content) {
      content = ''
     }
     if (!article_id) {
      article_id = 0
     }
     if (!websister_name) {
      websister_name = ''
     }
     if (!websister_link) {
      websister_link = ''
     }
     return new Promise((resolve, reject) => {
       pool.query(`insert into message (nick, content,type, article_id,websister_name,websister_link,create_time) 
      values ("${nick}", "${content}", "${type}", "${article_id}", "${websister_name}", "${websister_link}", now())`, (e, res, fields) => {
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