const router = require('koa-router')()
const articleSql = require('../controller/article')

router.post('/article/list', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  console.log('postParam', postParam)
  let sqlData = await articleSql.query(postParam)
  let tagTotal = await articleSql.queryTotal()

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

router.post('/article/detail', async(ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  let sqlData = await articleSql.queryDetail(postParam)
  ctx.body = {
    code: 200,
    data: sqlData,
    dataMsg: 'success'
  }; 
})

router.post('/article/add', async(ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  let sqlData = await articleSql.queryAdd(postParam)
  ctx.body = {
    code: 200,
    data: sqlData,
    dataMsg: 'success'
  }; 
})

router.post('/article/modify', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  const result = await articleSql.modifyArticle(postParam)
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

router.post('/article/del', async (ctx, next) => {
  let postParam = ctx.request.body //获取post提交的数据
  const result = await articleSql.delArticle(postParam)
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

router.post('/atricle/qryTag', async (ctx, next) => {
  let postParam = ctx.request.body;
  const result = await articleSql.qryTagArticle(postParam)
  const tagTotal = await articleSql.qryTagArticleTotal(postParam)
  let data = {
    items: result,
    total: tagTotal['COUNT(*)']
  }
  ctx.body = {
    code: 200,
    data,
    dataMsg: 'success'
  };
})

module.exports = router