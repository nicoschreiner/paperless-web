import Vue from 'vue'
import moment from 'moment'

Vue.filter('moment', function(value, format) {
  if (!value) return ''
  if (!format) return moment(value)

  return moment(value).format(format)
})
