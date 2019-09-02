const config = {
  // 启动端口
  port: 4001,

  // 数据库配置
  database: {
    DATABASE: 'bolg',
    USERNAME: 'root',
    PASSWORD: 'root',
    PORT: '3306',
    HOST: '47.98.146.104'
  },
  // 阿里云oss
  oss: {
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAIJdLBTrLrE9Qx',
    accessKeySecret: '6V1CdiWEz5x4hOdmnqxdkMWNX7eLbg',
    bucket: 'xcyzwang'
  }
}

module.exports = config