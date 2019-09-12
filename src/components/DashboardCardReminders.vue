<template>
  <dashboard-card-base
    :title="$t('dashboard.reminders.title')"
    :subtitle="$t('dashboard.reminders.subtitle')"
  >
    <v-container>
      <v-row align="center" justify="center">
        <v-chip color="info">{{ $t('misc.soon') }}</v-chip>
      </v-row>
    </v-container>
  </dashboard-card-base>
</template>

<script>
import DashboardCardBase from '@/components/DashboardCardBase'

export default {
  name: 'DashboardCardReminders',

  components: {
    DashboardCardBase
  }
}
</script>
