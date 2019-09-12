const pkg = require('./package')

// ~ 或 @ src目录
// ~~ 或 @@ 根目录

module.exports = {
  // spa || universal
  mode: 'universal',

  /*
   ** Headers of the page
   ** 
   */
  // 该配置项用于配置应用默认的meta标签。
  head: {
    //titleTemplate: '%s - Nuxt.js',
    // title: pkg.name,
    // meta: [{
    //     charset: 'utf-8'
    //   },
    //   {
    //     name: 'viewport',
    //     content: 'width=device-width, initial-scale=1'
    //   },
    //   {
    //     hid: 'description',
    //     name: 'description',
    //     content: pkg.description
    //   }
    // ],
    // link: [{
    //   rel: 'stylesheet',
    //   href: 'https://fonts.googleapis.com/css?family=Roboto'
    // }, {
    //   rel: 'icon',
    //   type: 'image/x-icon',
    //   href: '/favicon.ico'
    // }]
  },

  /*
   ** Customize the progress-bar color
   */
  // 在页面切换的时候，Nuxt.js 使用内置的加载组件显示加载进度条。你可以定制它的样式，禁用或者创建自己的加载组件。
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  // 该配置项用于定义应用的全局（所有页面均需引用的）样式文件、模块或第三方库。
  css: [
    'assets/less/common.less',
    'assets/less/reset.less',
    'assets/less/e-pan.less'
    // 'ant-design-vue/dist/antd.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~plugins/util',
      ssr: false
    },
    {
      src: '~plugins/ant-design-vue',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  // 该配置项允许您将Nuxt模块添加到项目中。
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  // Nuxt.js 允许你在自动生成的 vendor.bundle.js 文件中添加一些模块，以减少应用 bundle 的体积。如果你的应用依赖第三方模块，这个配置项是十分实用的。
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['ant-design-vue'],
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },
  // 该配置项让你开启组件缓存策略以提升渲染性能。
  // cache: true,
  // // or 
  // cache: {
  //   max: 1000,
  //   maxAge: 900000
  // },
  // // 该配置项用于配置 Nuxt.js 应用是开发还是生产模式。
  // // dev: (process.env.NODE_ENV !== 'production')
  // // 该配置项用于定义应用客户端和服务端的环境变量。
  // // Nuxt.js 让你可以配置在客户端和服务端共享的环境变量。
  // env: {},
  // // 该配置项用于定义每个动态路由的参数，Nuxt.js 依据这些路由配置生成对应目录结构的静态文件。
  // generate: {
  //   fallback: true, // if you want to use '404.html'
  //   fallback: 'my-fallback/file.html' // if your hosting needs a custom location
  // },
  // // 该配置项允许您定义Nuxt.js应用程序的node_modules文件夹。
  // modulesDir: {},
  // // 该配置项用于配置那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。
  // plugins: {},
  // // 该配置项用于配置 Nuxt.js 应用的根目录。
  // rootDir: {},
  // // 该配置项可用于覆盖 Nuxt.js 默认的 vue-router 配置。
  // router: {},
  // // 该配置项用于配置应用的源码目录路径。
  // srcDir: {},
  // // 该配置项用于个性化配置应用过渡效果属性的默认值。
  transition: 'test',
  proxy: {
    '^/api': {
      target: 'https://api.sgsonline.com.cn/ticLeads',
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}
