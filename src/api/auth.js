import axios from 'axios'

const prefix = process.env.VUE_APP_API_URL

export default {
  login({ username, password }) {
    return new Promise((resolve, reject) => {
      // We will just call the correspondents to check if the provided username and password are correct. This should be changed later.
      axios
        .get(prefix + '/correspondents', {
          auth: {
            username,
            password
          }
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
