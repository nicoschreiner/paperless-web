<template>
  <div>
    <v-list-item @click="toggleProfile">
      <v-list-item-content>
        <v-list-item-title class="title">
          Paperless Web
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ $store.state.auth.username }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon :class="{ rotate180: showProfile }">
          mdi-menu-down
        </v-icon>
      </v-list-item-action>
    </v-list-item>

    <v-expand-transition>
      <v-list v-if="showProfile" dense nav>
        <!-- Logout -->
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>

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

      <v-subheader>Documents</v-subheader>

      <!-- Correspondents -->
      <v-list-item :to="{ name: 'correspondents' }" disabled>
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Correspondents</v-list-item-title>
        </v-list-item-content>

        <v-chip x-small color="info">soon</v-chip>
      </v-list-item>

      <!-- Documents -->
      <v-list-item :to="{ name: 'documents' }" disabled>
        <v-list-item-icon>
          <v-icon>mdi-file-multiple</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Documents</v-list-item-title>
        </v-list-item-content>

        <v-chip x-small color="info">soon</v-chip>
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
      <v-list-item :to="{ name: 'reminders' }" disabled>
        <v-list-item-icon>
          <v-icon>mdi-bell</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Reminders</v-list-item-title>
        </v-list-item-content>

        <v-chip x-small color="info">soon</v-chip>
      </v-list-item>

      <v-subheader>Admin</v-subheader>

      <!-- Logs -->
      <v-list-item :to="{ name: 'logs' }">
        <v-list-item-icon>
          <v-icon>mdi-file-document-box</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logs</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showProfile: false
    }
  },

  methods: {
    logout() {},

    toggleProfile() {
      this.showProfile = !this.showProfile
    }
  }
}
</script>
