import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log(to.matched) // 获取路由元信息
  // if(to.matched[0].name !== 'login' && !localStorage.getItem('userInfo')) {
  //   next('/login')
  // } 
  if (to.meta.requireAuth && !localStorage.getItem('userInfo')) {
    next({ path: '/login' })
  } else {
    next()
  }
})
// 全局解析守卫
// router.beforeResolve((to, from, next) => {})
// 导航守卫
// router.beforeRouteUpdate((to, from, next) => {})
// 全局后置钩子
// router.afterEach((to, from) => {})

export default router