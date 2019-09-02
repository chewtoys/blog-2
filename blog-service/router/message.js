const router = require('koa-router')()
const messageSql = require('../controller/message')

router.post('/message/list', async (ctx, next) => {
  // let postParam = ctx.request.body //获取post提交的数据
  let sqlData = await messageSql.query()
  ctx.body = {
    code: 200,
    data: sqlData,
    dataMsg: 'success'
  }; 
})


module.exports = router