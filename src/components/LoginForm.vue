<template>
  <v-card>
    <v-form @submit.prevent="submit">
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:100"
            name="Username"
          >
            <v-text-field
              v-model="username"
              label="Username"
              prepend-icon="mdi-account"
              autocomplete="username"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>

          <ValidationProvider
            ref="vpPassword"
            v-slot="{ errors }"
            rules="required|max:100"
            name="Password"
          >
            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="mdi-key"
              type="password"
              autocomplete="current-password"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn type="submit" color="primary" :disabled="invalid">Login</v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null
    }
  },

  methods: {
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
    }
  }
}
</script>
