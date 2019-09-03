const router = require('koa-router')()
// const mysql = require('mysql')
const registerSql = require('../controller/register')

router.post('/register', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  console.log(postParam)
  let sqlData = await registerSql.query(postParam)

  ctx.body = {
    code: 200,
    data: sqlData,
    dataMsg: 'success'
  };
})

module.exports = router