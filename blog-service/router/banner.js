const router = require('koa-router')()
const bannerSql = require('../controller/banner')

router.post('/getBanner', async (ctx, next) => {
  // let postParam = ctx.request.body //获取post提交的数据
  let sqlData = await bannerSql.query()
  ctx.body = {
    code: 200,
    data: sqlData,
    dataMsg: 'success'
  }; 
})


module.exports = router