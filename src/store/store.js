import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import tags from './modules/tags'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    tags
  },
  state: {
    version: process.env.VUE_APP_VERSION || 0
  },
  mutations: {},
  actions: {},
  getters: {}
})
