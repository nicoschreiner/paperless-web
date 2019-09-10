<template>
  <v-card :loading="loading">
    <v-toolbar flat>
      <v-toolbar-title>Tags</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="onAdd">
            <v-icon>mdi-tag-plus</v-icon>
          </v-btn>
        </template>
        <span>add tag</span>
      </v-tooltip>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <tags-table :tags="tags"></tags-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import TagsTable from '@/components/TagsTable'

export default {
  components: {
    TagsTable
  },

  data() {
    return {
      loading: false,
      error: false
    }
  },

  computed: {
    ...mapState('tags', ['tags'])
  },

  mounted() {
    this.loadTags()
  },

  methods: {
    onAdd() {
      this.$emit('click:add')
    },

    loadTags() {
      this.loading = true
      this.error = false

      this.$store
        .dispatch('tags/load')
        .then(() => {
          this.loading = false
        })
        .catch(err => {
          this.$log.error(err)
          this.loading = false
          this.error = true
        })
    }
  }
}
</script>
