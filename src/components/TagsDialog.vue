<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <tags-form
      :tag="tag"
      @click:cancel="onCancel"
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
    open() {
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.tag = null
    },

    edit(tagId) {
      this.open()
      this.tag = this.$store.getters['tags/tagById'](tagId)
    },

    async submit() {
      const valid = await this.$refs.observer.validate()

      if (valid) {
        this.$store
          .dispatch('auth/login', {
            username: this.username,
            password: this.password
          })
          .then(() => {
            this.$emit('login:success')
          })
          .catch(err => {
            this.$log.error(err)
            this.$refs.vpPassword.setErrors(['Invalid Password'])
            this.$emit('login:fail')
          })
      }
    },

    onCancel() {
      this.close()
    }
  }
}
</script>
