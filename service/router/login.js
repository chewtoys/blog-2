const router = require('koa-router')()
// const mysql = require('mysql')
const loginSql = require('../controller/login')

router.post('/login', async (ctx, next) => {
  // console.log(ctx.session)
  let postParam = ctx.request.body //获取post提交的数据
  let sqlData = await loginSql.login(postParam)
  console.log('sqlData', sqlData)
  if(sqlData) {
    ctx.body = {
      code: 200,
      // data: sqlData,
      dataMsg: 'success'
    }; 
  } else {
    ctx.body = {
      code: 400,
      // data: ,
      dataMsg: '用户名或密码错误'
    }; 
  }
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