import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import axios from 'axios'
import store from './store.js'
import decode from 'jwt-decode'

const axiosConfig = {
  baseURL: 'http://localhost:3000/api'
};

Vue.prototype.$axios = axios.create(axiosConfig);
Vue.prototype.$axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('trainTicketJWT')}`;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),

  mounted() {
    if (localStorage.trainTicketJWT) {
      const payload = decode(localStorage.trainTicketJWT);
      const user = {
        username: payload.username,
        email: payload.email,
        phone_number: payload.phone_number,
        id_no: payload.id_no,
        role: payload.role,
        token: localStorage.trainTicketJWT
      };
      store.dispatch('setUserAction', user);
      this.$router.push(this.$router.currentRoute.name === 'login' ? 'home' : this.$router.currentRoute.path);
    }

    if (!localStorage.trainTicketJWT) {
      this.$router.push('login');
    }
  }
}).$mount('#app')
