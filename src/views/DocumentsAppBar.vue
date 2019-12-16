<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('click:nav')"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">{{
      $t('documents.title')
    }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <!--
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="openDialog">
          <v-icon>mdi-file-document-box-plus</v-icon>
        </v-btn>
      </template>
      <span>add document</span>
    </v-tooltip>

    <documents-dialog ref="dialog"></documents-dialog>
    -->
  </v-app-bar>
</template>

<script>
// import DocumentsDialog from '@/components/DocumentsDialog'

export default {
  name: 'DocumentsAppBar',

  /*
  components: {
    DocumentsDialog
  },
  */

  methods: {
    openDialog() {
      this.$refs.dialog.open()
    }
  }
}
</script>
