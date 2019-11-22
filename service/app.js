const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser') // 获取post参数中间件
const cors = require("koa-cors"); // 解决跨域
const session = require("koa-session")

const loginRouter = require('./router/login')
const uploadRouter = require('./router/upload')
const messageRouter = require('./router/message')
const tagRouter = require('./router/tag')
const articleRouter = require('./router/article')
const friendRoutrer = require('./router/friend')

app.use(bodyParser())
app.use(cors())

app.use(loginRouter.routes())
app.use(uploadRouter.routes())
app.use(messageRouter.routes())
app.use(tagRouter.routes())
app.use(articleRouter.routes())
app.use(friendRoutrer.routes())

app.listen(4001);