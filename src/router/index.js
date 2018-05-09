import Vue from 'vue'
import VueRouter from 'vue-router'

import base from './base'
import ErrorPage from '../layouts/error-page'

if (process.env.NODE_ENV === 'development') {
  Vue.use(VueRouter)
}

let list = []
list = list.concat(base)
list = list.concat([
  { path: '*', name: '404', component: ErrorPage, meta: { auth: false } }
])
if (process.env.NODE_ENV !== 'production') {
  const DevIcon = r => require.ensure([], () => r(require('../pages/dev/icon')), 'icon')
  list = list.concat([
    { path: '/dev/icon', component: DevIcon, meta: { layout: 'child', auth: false } }
  ])
}

// 实例化路由对象
const router = new VueRouter({
  mode: typeof (history.pushState) === 'function' ? 'history' : '',
  routes: list
})

// 路由鉴权规则
router.beforeEach((to, from, next) => {
  if (to.meta.auth === false) { // 不需要验证用户是否已登录
    // 登录后不可访问的页面
    const store = router.app.$store
    if (to.meta.type === 'noLogin' && store && store.state.user.id) {
      store.dispatch('setRouter', from.path)
      next('/')
    } else {
      next()
    }
  } else { // 验证用户是否登录
    const store = router.app.$store
    if (store) {
      store.dispatch('setLoading', true)
    }
    router.app.$httpPost('/api/admin', {}, false).then((res) => {
      if (res.errno === 0) { // 用户已登录
        if (store) {
          store.dispatch('setLoading', false)
          store.dispatch('login', res.data)
          store.dispatch('setRouter', from.path)
        }
        next()
      } else {
        if (store) {
          store.dispatch('setLoading', false)
          store.dispatch('logout')
          store.dispatch('setRouter', to.path)
        }
        router.replace('/login')
      }
    })
  }
})
export default router
