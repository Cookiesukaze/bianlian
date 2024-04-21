import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: '',
  },
  mutations: {
    setLoginState(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    login({ commit }, username) {
      commit('setLoginState', true);
      commit('setUsername', username);
    },
    logout({ commit }) {
      commit('setLoginState', false);
      commit('setUsername', '');
    },
  },
});
