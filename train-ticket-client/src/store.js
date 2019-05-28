import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
      localStorage.trainTicketJWT = payload.token;
    },

    deleteUser(state) {
      state.user = null;
      localStorage.removeItem('trainTicketJWT');
    }
  },

  actions: {
    setUserAction({ commit }, payload) {
      commit('setUser', payload);
    },

    deleteUserAction({ commit }) {
      commit('deleteUser');
    }
  }
})