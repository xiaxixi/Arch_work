import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Search from './pages/Search.vue'
import About from './pages/About.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

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
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})