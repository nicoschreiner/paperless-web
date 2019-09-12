<template>
  <v-container fluid>
    <v-row class="fill-height">
      <v-col cols="12" sm="6" md="4">
        <dashboard-card-correspondents></dashboard-card-correspondents>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <dashboard-card-documents></dashboard-card-documents>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <dashboard-card-tags></dashboard-card-tags>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <dashboard-card-reminders></dashboard-card-reminders>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <dashboard-card-logs></dashboard-card-logs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardCardCorrespondents from '@/components/DashboardCardCorrespondents'
import DashboardCardDocuments from '@/components/DashboardCardDocuments'
import DashboardCardTags from '@/components/DashboardCardTags'
import DashboardCardReminders from '@/components/DashboardCardReminders'
import DashboardCardLogs from '@/components/DashboardCardLogs'

export default {
  name: 'Dashboard',

  components: {
    DashboardCardCorrespondents,
    DashboardCardDocuments,
    DashboardCardTags,
    DashboardCardReminders,
    DashboardCardLogs
  }
}
</script>
