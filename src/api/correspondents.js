import * as log from 'loglevel'
import axios from 'axios'
import store from '@/store/store'

const prefix = process.env.VUE_APP_API_URL

export default {
  parseFromApi(correspondent) {
    if (!correspondent) {
      return null
    }

    return {
      id: correspondent.id,
      name: correspondent.name,
      match: correspondent.match,
      matchAlgo: correspondent.matching_algorithm,
      matchInsensitive: correspondent.is_insensitive
    }
  },

  parseToApi(correspondent) {
    if (!correspondent) {
      return null
    }

    return {
      name: correspondent.name,
      match: correspondent.match,
      matching_algorithm: correspondent.matchAlgo,
      is_insensitive: correspondent.matchInsensitive
    }
  },

  load() {
    return new Promise((resolve, reject) => {
      axios
        .get(prefix + '/correspondents/', {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          const correspondents = (res.data.results || []).map(item =>
            this.parseFromApi(item)
          )
          resolve(correspondents)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  },

  store(correspondent) {
    return new Promise((resolve, reject) => {
      const apiCorrespondent = this.parseToApi(correspondent)

      axios
        .post(prefix + '/correspondents/', apiCorrespondent, {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          const correspondent = this.parseFromApi(res.data)
          resolve(correspondent)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  },

  patch(correspondent) {
    return new Promise((resolve, reject) => {
      const apiCorrespondent = this.parseToApi(correspondent)

      axios
        .patch(
          prefix + '/correspondents/' + correspondent.id + '/',
          apiCorrespondent,
          {
            auth: {
              username: store.state.auth.username,
              password: store.state.auth.password
            }
          }
        )
        .then(res => {
          const correspondent = this.parseFromApi(res.data)
          resolve(correspondent)
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
        .delete(prefix + '/correspondents/' + id + '/', {
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
        .options(prefix + '/correspondents/', {
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
