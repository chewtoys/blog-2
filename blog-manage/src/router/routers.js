import NameViewDefault from './../views/viewName/Default'
import NameViewTest from './../views/viewName/Test'
// 组件按组分块
// const Foo = () => import( /* webpackChunkName: "group-foo" */ './Foo.vue')
// const Bar = () => import( /* webpackChunkName: "group-foo" */ './Bar.vue')
// const Baz = () => import( /* webpackChunkName: "group-foo" */ './Baz.vue')


const routes = [{
    path: '/',
    name: 'home',
    component: () => import('./../views/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login')
  },
  {
    path: '/frame',
    name: 'frame',
    component: () => import('./../views/Frame'),
    children: [
      //以 / 开头的嵌套路径会被当作根路径。
      {
        // 命名视图
        path: '/nameView',
        components: {
          default: NameViewDefault,
          test: NameViewTest
        }
      },
      {
        path: '/product/list',
        name: 'productList',
        component: () => import('./../views/product/List')
      },
      {
        path: '/news/list',
        name: 'newsList',
        component: () => import('./../views/news/List')
      },
      {
        path: '/factory/list',
        name: 'factoryList',
        component: () => import('./../views/factory/List')
      },
      {
        path: '/tag/list',
        name: 'tagList',
        component: () => import('./../views/tag/List')
      },
      {
        path: '/article/list',
        name: 'articleList',
        component: () => import('./../views/article/List')
      },
      {
        path: '/article/detail/:id',
        name: 'articleDetail',
        component: () => import('./../views/article/Detail')
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./../views/Test')
  },
  {
    // 别名 aliis和test-alias指向同一个
    path: '/alias',
    component: () => import('./../views/Alias'),
    alias: '/test-alias'
  },
  {
    // 路由组件props传参
    path: '/routerParam/:id',
    name: 'routerParam',
    component: () => import('./../views/RouterParam'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    // 路由独享的守卫
    path: '/beforeEnter',
    name: 'beforeEnter',
    beforeEnter: (to, from, next) => {
      console.log('路由独享的守卫')
    }
  },
  {
    // 会匹配以 `/user-` 开头的任意路径
    path: '/user-*'
  },
  // 会匹配所有路径
  {
    path: '*',
    name: '404',
    // redirect: '/'
    // redirect: {
    //   name: 'home'
    // }
    redirect: to => {
      return '/'
    }
  }
]

export default routes