// 一个中间件接收 context 作为第一个参数：

// export default function (context) {
//   context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
// }

// 中间件执行流程顺序：
// nuxt.config.js
// 匹配布局
// 匹配页面
