const config = {
  // 启动端口
  port: 4000,

  // 数据库配置
  database: {
    DATABASE: 'bolg',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: '127.0.0.1'
  },
  // 阿里云oss
  oss: {
    region: 'oss-cn-hangzhou',
    accessKeyId: 'your id',
    accessKeySecret: 'your secret',
    bucket: 'fuzhongkuo'
  }
}

module.exports = config