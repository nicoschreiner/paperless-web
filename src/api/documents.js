import * as log from 'loglevel'
import axios from 'axios'
import store from '@/store/store'

const prefix = process.env.VUE_APP_API_URL

export default {
  parseFromApi(document) {
    if (!document) {
      return null
    }

    return {
      id: document.id,
      title: document.title,
      content: document.content,
      correspondent: document.correspondent,
      tags: document.tags,
      fileType: document.file_type,
      fileName: document.file_name,
      created: document.created,
      modified: document.modified,
      added: document.added,
      urlFull: process.env.VUE_APP_BACKEND_URL + document.download_url,
      urlFullOriginal: document.download_url,
      urlThumb: process.env.VUE_APP_BACKEND_URL + document.thumbnail_url,
      urlThumbOriginal: document.thumbnail_url
    }
  },

  parseToApi(document) {
    if (!document) {
      return null
    }

    return {
      id: document.id,
      title: document.title,
      content: document.content,
      correspondent: document.correspondent,
      tags: document.tags,
      file_type: document.fileType,
      file_name: document.fileName,
      created: document.created,
      modified: document.modified,
      added: document.added,
      download_url: document.urlFullOriginal,
      thumbnail_url: document.urlThumbOriginal
    }
  },

  load() {
    return new Promise((resolve, reject) => {
      axios
        .get(prefix + '/documents/', {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          const documents = (res.data.results || []).map(item =>
            this.parseFromApi(item)
          )
          resolve(documents)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  },

  store(document) {
    return new Promise((resolve, reject) => {
      const apiDocument = this.parseToApi(document)

      axios
        .post(prefix + '/documents/', apiDocument, {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          const document = this.parseFromApi(res.data)
          resolve(document)
        })
        .catch(err => {
          log.error(err)
          reject(err)
        })
    })
  },

  patch(document) {
    return new Promise((resolve, reject) => {
      const apiDocument = this.parseToApi(document)

      axios
        .patch(prefix + '/documents/' + document.id + '/', apiDocument, {
          auth: {
            username: store.state.auth.username,
            password: store.state.auth.password
          }
        })
        .then(res => {
          const document = this.parseFromApi(res.data)
          resolve(document)
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
        .delete(prefix + '/documents/' + id + '/', {
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
        .options(prefix + '/documents/', {
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
