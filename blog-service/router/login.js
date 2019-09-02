const router = require('koa-router')()
// const mysql = require('mysql')
const loginSql = require('../controller/login')

router.post('/login', async (ctx, next) => {
  // console.log(ctx.session)
  let postParam = ctx.request.body //获取post提交的数据
  let sqlData = await loginSql.query(postParam)
  ctx.body = {
    code: 200,
    data: sqlData,
    dataMsg: 'success'
  }; 
})

router.post('/logout', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  ctx.body = {
    code: 200,
    data: postParam,
    dataMsg: 'fail'
  }; 
})

module.exports = router