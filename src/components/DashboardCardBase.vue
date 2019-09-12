<template>
  <v-card outlined height="100%" :loading="loading">
    <v-toolbar flat>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-if="title">{{ title }}</v-list-item-title>
          <v-list-item-subtitle v-if="subtitle">{{
            subtitle
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-btn v-if="to" icon :to="to">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DashboardCardBase',

  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>
