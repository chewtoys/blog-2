const router = require('koa-router')()
const tagSql = require('../controller/tag')

router.post('/tag/list', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  let sqlData = await tagSql.query(postParam)
  let tagTotal = await tagSql.queryTotal()

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

router.post('/tag/add', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  const result = await tagSql.addtag(postParam)
  console.log('result', result)
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

router.post('/tag/modify', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  const result = await tagSql.modifyTag(postParam)
  console.log('result', result)
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

router.post('/tag/del', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  console.log('postParam', postParam)
  const result = await tagSql.delTag(postParam)
  console.log('result', result)
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