<template>
  <dashboard-card-base
    :title="$t('dashboard.logs.title')"
    :subtitle="$t('dashboard.logs.subtitle')"
    :to="{ name: 'logs' }"
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
  name: 'DashboardCardLogs',

  components: {
    DashboardCardBase
  }
}
</script>
