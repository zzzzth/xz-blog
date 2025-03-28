import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Remark from '@/views/remark'
import Theme from '@/views/theme'
import User from '@/views/user'
// import Test from '@/views/test/test.vue'
Vue.use(VueRouter)

const router = new VueRouter({

  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/article', component: Article },
        { path: '/remark', component: Remark },
        { path: '/theme', component: Theme },
        { path: '/user', component: User }
      ]
    },
    {
      path: '/login', // 将 login 直接放到根级路由
      component: Login
    }

  ]

})

export default router
