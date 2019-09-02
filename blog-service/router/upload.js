const OSS = require('ali-oss')
const config = require('./../config')
const router = require('koa-router')()
const multer = require('koa-multer'); //加载koa-multer模块

let client = new OSS({
  region: config.oss.region,
  accessKeyId: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
  bucket: config.oss.bucket
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    (async function put() {
      try {
        // object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
        // let r1 = await client.put('object', '/Users/fuzhongkuo/Documents/picture/certificates/ken400-600.jpg');
        var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
        let r1 = await client.put(Date.now() + "." + fileFormat[fileFormat.length - 1], file.stream);
        cb(null, r1.url) //回调将url传递回去
      } catch (e) {
        console.error('error: ', e);
      }
    }
    )();
  }
})

var upload = multer({
  storage: storage
});

router.post('/upload', upload.single('file'), async (ctx, next) => {
  console.log(ctx.req.file.destination) // 拿到storage上面返回的oss路径
  ctx.body = {
    code: 200,
    data: ctx.req.file.destination,
    dataMsg: 'success'
  };
})

module.exports = router