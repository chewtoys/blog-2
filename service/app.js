const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser') // 获取post参数中间件
const cors = require("koa-cors"); // 解决跨域
const session = require("koa-session")

const loginRouter = require('./router/login')
const registerRouter = require('./router/register')
const bannerRouter = require('./router/banner')
const upload = require('./router/upload')
const message = require('./router/message')
const tag = require('./router/tag')
const article = require('./router/article')


app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess',
  /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true,
  /** (boolean) automatically commit headers (default true) */
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: true,
  /** (boolean) httpOnly or not (default true) */
  signed: true,
  /** (boolean) signed or not (default true) */
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false,
  /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};


app.use(session(CONFIG, app));
app.use(bodyParser())
app.use(cors())

// app.use(async ctx => {
//   let sqlData = await mysql.query()
//   let url = ctx.url;
//   let request = ctx.request;
//   let req_query = request.query;
//   let req_queryString = request.querystring;

//   // debugger
//   // console.log(data, 'data')
//   let data = {
//     url,
//     request,
//     req_query,
//     req_queryString,
//     sqlData
//   }
//   ctx.body = data;
// });

// get接口
// router.get('/', async(ctx, next) => {
//   ctx.response.body = `<h1>index page</h1>`
// })



app.use(loginRouter.routes())
app.use(registerRouter.routes())
app.use(bannerRouter.routes())
app.use(upload.routes())
app.use(message.routes())
app.use(tag.routes())
app.use(article.routes())

app.use(ctx => {
  console.log(ctx.session, 'ctx.session')
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});


app.listen(4001);