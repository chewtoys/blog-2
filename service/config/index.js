const config = {
  // 启动端口
  port: 4000,

  // 数据库配置
  // database: {
  //   DATABASE: 'bolg',
  //   USERNAME: 'root',
  //   PASSWORD: '123456',
  //   PORT: '3306',
  //   HOST: '127.0.0.1'
  // },
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
    accessKeyId: 'LTAI4Fhy1PTDDKwyFofpJLGr',
    accessKeySecret: 'QkG8vnTKDBYxiGgAohGDrdtC1xM7EP',
    bucket: 'fuzhongkuo'
  }
}

module.exports = config