import Vue from 'vue'
import config from '../config'
import App from './App.vue'
import routes from './routes/routes'
import VueRouter from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './store/store'
import Vuex from 'vuex'
import axios from 'axios'
import checkLogin from '@/utils/checkLogin'

// import { Dialog, Autocomplete, Menu, Submenu, MenuItem, Input, Select, Button, Table, TableColumn, DatePicker, TimePicker, Tooltip, Form, FormItem, Tabs, TabPane, Backtop, Message, MessageBox, Loading, Container, Drawer, Header, Main, Badge, Divider, Card, Tag, Cascader } from 'element-ui'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

// element-ui
Vue.use(ElementUI)
// Vue.use(Dialog)
// Vue.use(Autocomplete)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(Input)
// Vue.use(Select)
// Vue.use(Button)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(DatePicker)
// Vue.use(TimePicker)
// Vue.use(Tooltip)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Tabs)
// Vue.use(TabPane)
// Vue.use(Backtop)
// Vue.use(Loading)
// Vue.use(Container)
// Vue.use(Drawer)
// Vue.use(Header)
// Vue.use(Main)
// Vue.use(Badge)
// Vue.use(Divider)
// Vue.use(Card)
// Vue.use(Tag)
// Vue.use(Cascader)

// Vue.use(Loading.directive)
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message

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
  mode: 'history',
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
if (process.env.VUE_APP_BAIDU_ANALYSIS !== undefined && process.env.NODE_ENV === 'production') {
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
