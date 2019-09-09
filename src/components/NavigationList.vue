<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Paperless Web
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ $store.state.auth.username }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <!-- Dashboard -->
      <v-list-item :to="{ name: 'dashboard' }">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Correspondents -->
      <v-list-item :to="{ name: 'correspondents' }">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Correspondents</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Documents -->
      <v-list-item :to="{ name: 'documents' }">
        <v-list-item-icon>
          <v-icon>mdi-file-multiple</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Documents</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Logs -->
      <v-list-item :to="{ name: 'logs' }">
        <v-list-item-icon>
          <v-icon>mdi-file-document-box</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logs</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Tags -->
      <v-list-item :to="{ name: 'tags' }">
        <v-list-item-icon>
          <v-icon>mdi-tag-multiple</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Tags</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Reminders -->
      <v-list-item :to="{ name: 'reminders' }">
        <v-list-item-icon>
          <v-icon>mdi-bell</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Reminders</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
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
          .catch(() => {
            this.$refs.vpPassword.setErrors(['Invalid Password'])
            this.$emit('login:fail')
          })
      }
    }
  }
}
</script>
