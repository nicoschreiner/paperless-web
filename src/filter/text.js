import Vue from 'vue'

Vue.filter('trim', function(value) {
  if (!value) return ''

  return value.trim()
})
