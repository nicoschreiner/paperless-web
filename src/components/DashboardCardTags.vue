<template>
  <dashboard-card-base
    :title="$t('dashboard.tags.title')"
    :subtitle="$t('dashboard.tags.subtitle')"
    :to="{ name: 'tags' }"
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
  name: 'DashboardCardTags',

  components: {
    DashboardCardBase
  }
}
</script>
