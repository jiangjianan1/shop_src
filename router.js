// 导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import users from './components/user/users.vue'
import roles from './components/roles/roles.vue'
import rights from './components/rights/rights.vue'

// 创建路由实例
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: users },
        { path: '/roles', component: roles },
        { path: '/rights', component: rights }
      ]
    }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
// 导出路由
export default router
