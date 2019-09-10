import * as log from 'loglevel'
import _ from 'lodash'
import Vue from 'vue'
import TagsApi from '@/api/tags'

export default {
  namespaced: true,
  state: {
    loading: false,
    colors: [],
    tags: []
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },

    setColors(state, colors) {
      state.colors = colors
    },

    setTags(state, tags) {
      state.tags = tags
    },

    addTag(state, tag) {
      state.tags.push(tag)
    },

    updateTag(state, tag) {
      const index = state.tags.findIndex(item => item.id === tag.id)
      Vue.set(state.tags, index, tag)
    },

    removeTag(state, id) {
      const index = state.tags.findIndex(item => item.id === id)
      state.tags.splice(index, 1)
    }
  },
  actions: {
    load({ state, commit }, { force } = {}) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        if (force || !state.tags || state.tags.length === 0) {
          TagsApi.options()
            .then(res => {
              // then: TagsApi.options()
              const colors = _.get(res, 'actions.POST.colour.choices', []).map(
                item => {
                  return {
                    text: item.display_name,
                    value: item.value
                  }
                }
              )
              commit('setColors', colors)

              return TagsApi.load()
            })
            .then(tags => {
              // then: TagsApi.load()
              commit('setTags', tags)
              commit('setLoading', false)
              resolve(tags)
            })
            .catch(err => {
              log.error(err)
              commit('setColors', [])
              commit('setTags', [])
              commit('setLoading', false)
              reject(err)
            })
        } else {
          commit('setLoading', false)
          resolve(state.tags)
        }
      })
    },

    add({ commit }, { name, color, match, matchAlgo, matchInsensitive }) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        TagsApi.store({
          name,
          color,
          match,
          matchAlgo,
          matchInsensitive
        })
          .then(tag => {
            commit('addTag', tag)
            commit('setLoading', false)
            resolve(tag)
          })
          .catch(err => {
            log.error(err)
            commit('setLoading', false)
            reject(err)
          })
      })
    },

    update({ commit }, tag) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        TagsApi.patch(tag)
          .then(tag => {
            commit('updateTag', tag)
            commit('setLoading', false)
            resolve(tag)
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

        TagsApi.destroy({
          id
        })
          .then(() => {
            commit('removeTag', id)
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
    tagById: state => id => state.tags.find(item => item.id === id)
  }
}
