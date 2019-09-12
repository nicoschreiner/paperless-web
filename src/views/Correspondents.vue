<template>
  <v-container fill-height fluid>
    <v-row class="fill-height">
      <v-col>
        <correspondents-table
          @edit="onEditItem"
          @delete="onDeleteItem"
        ></correspondents-table>
        <correspondents-dialog ref="dialog"></correspondents-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

import CorrespondentsTable from '@/components/CorrespondentsTable'
import CorrespondentsDialog from '@/components/CorrespondentsDialog'

export default {
  name: 'Correspondents',

  components: {
    CorrespondentsTable,
    CorrespondentsDialog
  },

  mounted() {
    this.$store.dispatch('correspondents/load')
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
          this.$store.dispatch('correspondents/delete', { id })
        }
      })
    }
  }
}
</script>
