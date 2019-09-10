<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('click:nav')"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">Tags</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="openDialog">
          <v-icon>mdi-tag-plus</v-icon>
        </v-btn>
      </template>
      <span>add tag</span>
    </v-tooltip>

    <tags-dialog ref="dialog"></tags-dialog>
  </v-app-bar>
</template>

<script>
import TagsDialog from '@/components/TagsDialog'

export default {
  name: 'TagsAppBar',

  components: {
    TagsDialog
  },

  methods: {
    openDialog() {
      this.$refs.dialog.open()
    }
  }
}
</script>
