import AuthApi from '@/api/auth'

export default {
  namespaced: true,
  state: {
    username: null,
    password: null // We have to store the password to use djangos basic auth.
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    },

    setPassword(state, password) {
      state.password = password
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      commit('setUsername', username)
      commit('setPassword', password)

      return AuthApi.login({ username, password })
    }
  },
  getters: {
    isAuthenticated: state => state.username && state.password
  }
}
