const router = require('koa-router')()
const messageSql = require('../controller/message')

router.post('/message/list', async (ctx, next) => {
  let postParam = ctx.request.body
  let itemList = await messageSql.queryList(postParam)
  let messageTotal = await messageSql.queryTotal()

  let data = {
    items: itemList,
    total: messageTotal['COUNT(*)']
  }
  ctx.body = {
    code: 200,
    data,
    dataMsg: 'success'
  };
})

router.post('/message/del', async (ctx, next) => {
  let postParam = ctx.request.body 
  const result = await messageSql.delMessage(postParam)
  if (result.affectedRows) {
    ctx.body = {
      code: 200,
      dataMsg: 'success'
    };
  } else {
    ctx.body = {
      code: 400,
      dataMsg: 'fail'
    };
  }
})

module.exports = router