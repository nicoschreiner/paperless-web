<template>
  <v-data-table
    :headers="headers"
    :items="logs"
    :loading="loading"
    :server-items-length="logsTotal"
    :items-per-page="logs.length"
    :options.sync="options"
    :footer-props="{
      itemsPerPageOptions: [25],
      disableItemsPerPage: true
    }"
    @update:page="updatePage"
  >
    <template v-slot:item.time="{ item }">
      {{ item.time | moment('YYYY/MM/DD HH:mm:ss') }}
    </template>
    <template v-slot:item.messages="{ item }">
      <span style="white-space: pre-wrap;" v-html="item.messages">
        {{ item.messages | trim }}
      </span>
    </template>
  </v-data-table>
</template>

<script>
import LogsApi from '@/api/logs'

export default {
  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Created',
          align: 'left',
          sortable: false,
          value: 'time'
        },
        {
          text: 'Message',
          align: 'left',
          sortable: false,
          value: 'messages'
        }
      ],
      logs: [],
      logsTotal: null,
      options: {}
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    loadPage(page) {
      this.loading = true

      LogsApi.load({ page })
        .then(res => {
          this.logs = res.results
          this.logsTotal = res.count
          this.loading = false
        })
        .catch(err => {
          this.$log.error(err)
          this.loading = false
        })
    },

    init() {
      this.loadPage(1)
    },

    updatePage(page) {
      this.loadPage(page)
    }
  }
}
</script>
