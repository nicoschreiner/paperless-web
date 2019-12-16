import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import tags from './modules/tags'
import correspondents from './modules/correspondents'
import documents from './modules/documents'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    tags,
    correspondents,
    documents
  },
  state: {
    version: process.env.VUE_APP_VERSION || 0
  },
  mutations: {},
  actions: {},
  getters: {}
})
