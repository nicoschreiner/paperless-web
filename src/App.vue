<template>
  <v-app>
    <v-navigation-drawer v-if="layout === 'app'" v-model="drawer" app>
      <navigation-list></navigation-list>
    </v-navigation-drawer>

    <v-app-bar v-if="layout === 'app'" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline">{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-content style="background-color: white;">
      <router-view></router-view>
    </v-content>

    <v-footer v-if="layout === 'app'" app>
      Version: {{ $store.state.version }}
    </v-footer>
  </v-app>
</template>

<script>
import _ from 'lodash'
import NavigationList from '@/components/NavigationList'

export default {
  name: 'App',

  components: {
    NavigationList
  },

  data() {
    return {
      drawer: true
    }
  },

  computed: {
    layout() {
      if (this.$route) {
        return this.$route.meta.layout
      } else {
        return ''
      }
    },

    title() {
      return _.get(this.$route, 'meta.title', 'Paperless Web')
    }
  }
}
</script>
