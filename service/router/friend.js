const router = require('koa-router')()
const friendSql = require('../controller/friend')

router.post('/friend/list', async (ctx, next) => {
  let sqlData = await friendSql.queryList()
  let tagTotal = await friendSql.queryTotal()

  let data = {
    items: sqlData,
    total: tagTotal['COUNT(*)']
  }
  ctx.body = {
    code: 200,
    data,
    dataMsg: 'success'
  };
})

router.post('/friend/add', async (ctx, next) => {
  let postParam = ctx.request.body
  const result = await friendSql.addFriend(postParam)
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

router.post('/friend/modify', async (ctx, next) => {
  let postParam = ctx.request.body
  const result = await friendSql.modifyFriend(postParam)
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

router.post('/friend/del', async (ctx, next) => {
  let postParam = ctx.request.body
  const result = await friendSql.delFriend(postParam)
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