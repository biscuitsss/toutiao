import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login'
import Layout from '@/views/home/index'
import Home from '@/views/home/Home'
import Article from '@/views/article/Article'
import Publish from '@/views/publish/Publish'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: Article,
        component: Article
      },
      {
        path: '/publish',
        name: Publish,
        component: Publish
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
