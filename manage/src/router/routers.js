const meta = {
  requireAuth: true
};
const routes = [{
    path: '/',
    name: 'home',
    meta,
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
    children: [{
        path: '/tag/list',
        name: 'tagList',
        meta,
        component: () => import('./../views/tag/List')
      },
      {
        path: '/article/list',
        name: 'articleList',
        meta,
        component: () => import('./../views/article/List')
      },
      {
        path: '/article/detail/:id',
        name: 'articleDetail',
        meta,
        component: () => import('./../views/article/Detail')
      },
      {
        path: '/firend/list',
        name: 'firendList',
        meta,
        component: () => import('./../views/firend/List')
      }, 
      {
        path: '/message/list',
        name: 'messageList',
        meta,
        component: () => import('./../views/message/List')
      }
    ]
  },
  {
    // 路由独享的守卫
    path: '/beforeEnter',
    name: 'beforeEnter',
    beforeEnter: (to, from, next) => {
      console.log(to, from, next, '路由独享的守卫')
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