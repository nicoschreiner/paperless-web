import axios from 'axios'
import store from '@/store/store'

const prefix = process.env.VUE_APP_API_URL

export default {
  load({ page }) {
    return new Promise((resolve, reject) => {
      // We will just call the correspondents to check if the provided username and password are correct. This should be changed later.
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
          reject(err)
        })
    })
  }
}
