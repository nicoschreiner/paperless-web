<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <correspondents-form
      :correspondent="correspondent"
      @click:cancel="close"
      @submit:success="close"
    ></correspondents-form>
  </v-dialog>
</template>

<script>
import CorrespondentsForm from '@/components/CorrespondentsForm'

export default {
  components: {
    CorrespondentsForm
  },

  data() {
    return {
      dialog: false,
      correspondent: null
    }
  },

  methods: {
    // called from parent
    open() {
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.correspondent = null
    },

    // called from parent
    edit(correspondentId) {
      this.open()
      this.correspondent = this.$store.getters[
        'correspondents/correspondentById'
      ](correspondentId)
    }
  }
}
</script>
