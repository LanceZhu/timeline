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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
