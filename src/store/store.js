import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import tags from './modules/tags'
import correspondents from './modules/correspondents'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    tags,
    correspondents
  },
  state: {
    version: process.env.VUE_APP_VERSION || 0
  },
  mutations: {},
  actions: {},
  getters: {}
})
