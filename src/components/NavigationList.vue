<template>
  <div>
    <v-list-item @click="toggleProfile">
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ $t('title') }}
        </v-list-item-title>
        <v-list-item-subtitle> </v-list-item-subtitle>
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
            <v-list-item-title>{{ $t('misc.logout') }}</v-list-item-title>
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
          <v-list-item-title>{{
            $t('navigation.dashboard')
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader>{{ $t('navigation.subheader.documents') }}</v-subheader>

      <!-- Correspondents -->
      <v-list-item :to="{ name: 'correspondents' }" disabled>
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{
            $t('navigation.correspondents')
          }}</v-list-item-title>
        </v-list-item-content>

        <v-chip x-small color="info">{{ $t('misc.soon') }}</v-chip>
      </v-list-item>

      <!-- Documents -->
      <v-list-item :to="{ name: 'documents' }" disabled>
        <v-list-item-icon>
          <v-icon>mdi-file-multiple</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{
            $t('navigation.documents')
          }}</v-list-item-title>
        </v-list-item-content>

        <v-chip x-small color="info">{{ $t('misc.soon') }}</v-chip>
      </v-list-item>

      <!-- Tags -->
      <v-list-item :to="{ name: 'tags' }">
        <v-list-item-icon>
          <v-icon>mdi-tag-multiple</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('navigation.tags') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Reminders -->
      <v-list-item :to="{ name: 'reminders' }" disabled>
        <v-list-item-icon>
          <v-icon>mdi-bell</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{
            $t('navigation.reminders')
          }}</v-list-item-title>
        </v-list-item-content>

        <v-chip x-small color="info">{{ $t('misc.soon') }}</v-chip>
      </v-list-item>

      <v-subheader>{{ $t('navigation.subheader.admin') }}</v-subheader>

      <!-- Logs -->
      <v-list-item :to="{ name: 'logs' }">
        <v-list-item-icon>
          <v-icon>mdi-file-document-box</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('navigation.logs') }}</v-list-item-title>
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
