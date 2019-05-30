import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Search from './pages/Search.vue'
import About from './pages/About.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Order from './pages/Order.vue'
import Mail from './pages/Mail.vue'
import Announcement from './pages/Announcement.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/mail',
      name: 'mail',
      component: Mail
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/order/:type',
      name: 'orderitem',
      component: () => import('./pages/OrderItem.vue')

    },
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})