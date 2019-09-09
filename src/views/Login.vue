<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <login-form @login:success="onLogin"></login-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  name: 'Login',

  components: {
    LoginForm
  },

  props: {
    redirect: {
      type: String,
      required: false,
      default: 'dashboard'
    }
  },

  methods: {
    onLogin() {
      this.$router.push({ name: this.redirect })
    }
  }
}
</script>
