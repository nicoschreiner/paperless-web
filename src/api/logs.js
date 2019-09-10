import * as log from 'loglevel'
import axios from 'axios'
import store from '@/store/store'

const prefix = process.env.VUE_APP_API_URL

export default {
  load({ page }) {
    return new Promise((resolve, reject) => {
      axios
        .get(prefix + '/logs' + (page ? '/?page=' + page : ''), {
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
