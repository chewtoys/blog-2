# nuxt.js + koa2 + mysql + vue-cli3 + element-ui 搭建的个人博客
* 线上地址： [付仲阔的博客](http://www.fuzhongkuo.com)
* 提供用户展示的view文件内，使用的vue的同构框架nuxt.js，为了更好的seo。
* 管理端使用的vue-cli3和element-ui快速构建的管理界面。
* 数据储存使用的mysql，后台服务为koa2。

## 主要功能有
* 登录(登录状态维护);
* 文章维护（富文本编辑）、基于OSS上传;
* 标签维护;
* 未完待续...

## 本地运行
  $ git clone git@github.com:e-pan/bolg.git
  
  $ //运行服务
  $ cd service 
  
  $ npm install
  
  $ npm run dev
  
  // 运行用户端
  $ cd view
  
  $ npm install
  
  $ npm run dev

  // 运行管理端
  $ cd manage
  
  $ npm install
  
  $ npm run serve
    
* 本地需要安装mysql服务。
