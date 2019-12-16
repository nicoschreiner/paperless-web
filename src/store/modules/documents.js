import * as log from 'loglevel'
import Vue from 'vue'
import DocumentsApi from '@/api/documents'

export default {
  namespaced: true,
  state: {
    loading: false,
    documents: []
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },

    setDocuments(state, documents) {
      state.documents = documents
    },

    addDocument(state, document) {
      state.documents.push(document)
    },

    updateDocument(state, document) {
      const index = state.documents.findIndex(item => item.id === document.id)
      Vue.set(state.documents, index, document)
    },

    removeDocument(state, id) {
      const index = state.documents.findIndex(item => item.id === id)
      state.documents.splice(index, 1)
    }
  },
  actions: {
    load({ state, commit }, { force } = {}) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        if (force || !state.documents || state.documents.length === 0) {
          DocumentsApi.load()
            .then(documents => {
              commit('setDocuments', documents)
              commit('setLoading', false)
              resolve(documents)
            })
            .catch(err => {
              log.error(err)
              commit('setDocuments', [])
              commit('setLoading', false)
              reject(err)
            })
        } else {
          commit('setLoading', false)
          resolve(state.documents)
        }
      })
    },

    /*
    add({ commit }, { name, match, matchAlgo, matchInsensitive }) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        DocumentsApi.store({
          name,
          match,
          matchAlgo,
          matchInsensitive
        })
          .then(document => {
            commit('addDocument', document)
            commit('setLoading', false)
            resolve(document)
          })
          .catch(err => {
            log.error(err)
            commit('setLoading', false)
            reject(err)
          })
      })
    },
    */

    update({ commit }, document) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        DocumentsApi.patch(document)
          .then(document => {
            commit('updateDocument', document)
            commit('setLoading', false)
            resolve(document)
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

        DocumentsApi.destroy({
          id
        })
          .then(() => {
            commit('removeDocument', id)
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
    documentById: state => id => state.documents.find(item => item.id === id)
  }
}
