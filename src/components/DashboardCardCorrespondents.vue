<template>
  <dashboard-card-base
    :title="$t('dashboard.correspondents.title')"
    :subtitle="$t('dashboard.correspondents.subtitle')"
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
  name: 'DashboardCardCorrespondents',

  components: {
    DashboardCardBase
  }
}
</script>
