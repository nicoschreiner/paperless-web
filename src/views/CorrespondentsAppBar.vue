<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('click:nav')"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">{{
      $t('correspondents.title')
    }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="openDialog">
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
      </template>
      <span>add correspondent</span>
    </v-tooltip>

    <correspondents-dialog ref="dialog"></correspondents-dialog>
  </v-app-bar>
</template>

<script>
import CorrespondentsDialog from '@/components/CorrespondentsDialog'

export default {
  name: 'CorrespondentsAppBar',

  components: {
    CorrespondentsDialog
  },

  methods: {
    openDialog() {
      this.$refs.dialog.open()
    }
  }
}
</script>
