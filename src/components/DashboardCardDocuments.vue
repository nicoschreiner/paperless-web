<template>
  <dashboard-card-base
    :title="$t('dashboard.documents.title')"
    :subtitle="$t('dashboard.documents.subtitle')"
    :to="{ name: 'documents' }"
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
  name: 'DashboardCardDocuments',

  components: {
    DashboardCardBase
  }
}
</script>
