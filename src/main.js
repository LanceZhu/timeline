import Vue from 'vue'
import config from '../config'
import App from './App.vue'
import routes from './routes/routes'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './store/store'
import Vuex from 'vuex'
import axios from 'axios'
import checkLogin from '@/utils/checkLogin'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueQuillEditor)
Vue.use(Vuex)

// axios
axios.defaults.baseURL = config.baseURL
// axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

// vue-router
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})
// router.push('/index')
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const logged = await checkLogin.checkLogin()
    if (!logged) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// 百度统计
if (process.env.VUE_APP_BAIDU_ANALYSIS !== undefined) {
  var _hmt = _hmt || []
  window._hmt = _hmt; // 修改为window 全局变量
  (function () {
    var hm = document.createElement('script')
    hm.src = process.env.VUE_APP_BAIDU_ANALYSIS
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()

  router.beforeEach((to, from, next) => {
    if (window._hmt) {
      if (to.path) {
        window._hmt.push(['_trackPageview', '/#' + to.fullPath])
      }
    }
    next()
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
