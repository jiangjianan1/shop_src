import Vue from 'vue'
import App from './App.vue'
// 引入路由 挂载到Vue实例
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'

// 解决axios三个问题
// - 问题 1 : 每次都加基准地址
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 问题二:每个组件里使用axios都要引入
Vue.prototype.$axios = axios // 以后Vue的实例都可以引用axios  (组件本质就是Vue实例)
// 问题三:  每次请求都要携带token   用拦截器
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
