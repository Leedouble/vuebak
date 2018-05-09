// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import store from './vuex/store'
import router from './router'
import App from './App'

import Element from 'element-ui'
// import './assets/scss/element-variables.scss'

// plugin
import VueHttp from './plugins/http'
import VueTool from './plugins/tool'
import Vicon from './components/_unit/vicon'

// filter
import DateTime from './filters/datetime'
import Price from './filters/price'

Vue.use(VueX)
Vue.use(VueHttp)
Vue.use(VueTool)
Vue.component('vicon', Vicon)

// element-ui
if (process.env.NODE_ENV === 'development') {
  Vue.use(Element)
}

Object.keys(DateTime).forEach((key) => {
  Vue.filter(key, DateTime[key])
})
Object.keys(Price).forEach((key) => {
  Vue.filter(key, Price[key])
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
