<template>
  <v-container fill-height fluid>
    <v-row class="fill-height">
      <v-col>
        <documents-list
          @edit="onEditItem"
          @delete="onDeleteItem"
        ></documents-list>
        <!--
        <documents-dialog ref="dialog"></documents-dialog>
        -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

import DocumentsList from '@/components/DocumentsList'
// import DocumentsDialog from '@/components/DocumentsDialog'

export default {
  name: 'Documents',

  components: {
    DocumentsList,
    // DocumentsDialog
  },

  mounted() {
    this.$store.dispatch('documents/load')
  },

  methods: {
    onEditItem(id) {
      this.$refs.dialog.edit(id)
    },
    onDeleteItem(id) {
      const theme = this.$vuetify.theme.isDark
        ? this.$vuetify.theme.themes.dark
        : this.$vuetify.theme.themes.light

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: theme.error,
        confirmButtonColor: theme.primary,
        confirmButtonText: 'Delete it'
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('documents/delete', { id })
        }
      })
    }
  }
}
</script>
