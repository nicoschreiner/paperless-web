<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <tags-form
      :tag="tag"
      @click:cancel="close"
      @submit:success="close"
    ></tags-form>
  </v-dialog>
</template>

<script>
import TagsForm from '@/components/TagsForm'

export default {
  components: {
    TagsForm
  },

  data() {
    return {
      dialog: false,
      tag: null
    }
  },

  methods: {
    // called from parent
    open() {
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.tag = null
    },

    // called from parent
    edit(tagId) {
      this.open()
      this.tag = this.$store.getters['tags/tagById'](tagId)
    }
  }
}
</script>
