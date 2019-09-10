import * as log from 'loglevel'
import axios from 'axios'
import store from '@/store/store'

const prefix = process.env.VUE_APP_API_URL

export default {
  parseFromApi(tag) {
    if (!tag) {
      return null
    }

    return {
      id: tag.id,
      name: tag.name,
      color: tag.colour,
      match: tag.match,
      matchAlgo: tag.matching_algorithm,
      matchInsensitive: tag.is_insensitive
    }
  },

  parseToApi(tag) {
    if (!tag) {
      return null
    }

    return {
      name: tag.name,
      colour: tag.color,
      match: tag.match,
      matching_algorithm: tag.matchAlgo,
      is_insensitive: tag.matchInsensitive
    }
  },

  load() {
    return new Promise((resolve, reject) => {
      axios
        .get(prefix + '/tags/', {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          const tags = (res.data.results || []).map(item =>
            this.parseFromApi(item)
          )
          resolve(tags)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  },

  store(tag) {
    return new Promise((resolve, reject) => {
      const apiTag = this.parseToApi(tag)

      axios
        .post(prefix + '/tags/', apiTag, {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          const tag = this.parseFromApi(res.data)
          resolve(tag)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  },

  patch(tag) {
    return new Promise((resolve, reject) => {
      const apiTag = this.parseToApi(tag)

      axios
        .patch(prefix + '/tags/' + tag.id + '/', apiTag, {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          const tag = this.parseFromApi(res.data)
          resolve(tag)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  },

  destroy({ id }) {
    return new Promise((resolve, reject) => {
      axios
        .delete(prefix + '/tags/' + id + '/', {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(() => {
          resolve(id)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  },

  options() {
    return new Promise((resolve, reject) => {
      axios
        .options(prefix + '/tags/', {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  }
}
