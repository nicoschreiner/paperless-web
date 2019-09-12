import * as log from 'loglevel'
import Vue from 'vue'
import CorrespondentsApi from '@/api/correspondents'

export default {
  namespaced: true,
  state: {
    loading: false,
    correspondents: []
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },

    setCorrespondents(state, correspondents) {
      state.correspondents = correspondents
    },

    addCorrespondent(state, correspondent) {
      state.correspondents.push(correspondent)
    },

    updateCorrespondent(state, correspondent) {
      const index = state.correspondents.findIndex(
        item => item.id === correspondent.id
      )
      Vue.set(state.correspondents, index, correspondent)
    },

    removeCorrespondent(state, id) {
      const index = state.correspondents.findIndex(item => item.id === id)
      state.correspondents.splice(index, 1)
    }
  },
  actions: {
    load({ state, commit }, { force } = {}) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        if (
          force ||
          !state.correspondents ||
          state.correspondents.length === 0
        ) {
          CorrespondentsApi.load()
            .then(correspondents => {
              commit('setCorrespondents', correspondents)
              commit('setLoading', false)
              resolve(correspondents)
            })
            .catch(err => {
              log.error(err)
              commit('setCorrespondents', [])
              commit('setLoading', false)
              reject(err)
            })
        } else {
          commit('setLoading', false)
          resolve(state.correspondents)
        }
      })
    },

    add({ commit }, { name, match, matchAlgo, matchInsensitive }) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        CorrespondentsApi.store({
          name,
          match,
          matchAlgo,
          matchInsensitive
        })
          .then(correspondent => {
            commit('addCorrespondent', correspondent)
            commit('setLoading', false)
            resolve(correspondent)
          })
          .catch(err => {
            log.error(err)
            commit('setLoading', false)
            reject(err)
          })
      })
    },

    update({ commit }, correspondent) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        CorrespondentsApi.patch(correspondent)
          .then(correspondent => {
            commit('updateCorrespondent', correspondent)
            commit('setLoading', false)
            resolve(correspondent)
          })
          .catch(err => {
            log.error(err)
            commit('setLoading', false)
            reject(err)
          })
      })
    },

    delete({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        CorrespondentsApi.destroy({
          id
        })
          .then(() => {
            commit('removeCorrespondent', id)
            commit('setLoading', false)
            resolve(id)
          })
          .catch(err => {
            log.error(err)
            commit('setLoading', false)
            reject(err)
          })
      })
    }
  },

  getters: {
    correspondentById: state => id =>
      state.correspondents.find(item => item.id === id)
  }
}
