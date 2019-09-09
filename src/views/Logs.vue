<template>
  <v-container fill-height fluid>
    <v-row class="fill-height">
      <v-col>
        <logs-table></logs-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LogsTable from '@/components/LogsTable'

export default {
  name: 'Logs',

  components: {
    LogsTable
  }
}
</script>
