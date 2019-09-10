<template>
  <v-data-table :loading="loading" :headers="headers" :items="tags">
    <template v-slot:item.color="{ item }">
      <v-chip pill>
        <v-avatar left :color="getColor(item.color)"></v-avatar>
        {{ getColor(item.color) }}
      </v-chip>
    </template>

    <template v-slot:item.matchInsensitive="{ item }">
      <v-icon v-if="item.matchInsensitive" color="success">
        mdi-check-circle
      </v-icon>
      <v-icon v-else color="error">mdi-minus-circle </v-icon>
    </template>

    <template v-slot:item.action="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon @click="$emit('edit', item.id)">
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
        {{ $t('misc.edit') }}
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon @click="$emit('delete', item.id)">
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        {{ $t('misc.delete') }}
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TagsTable',

  data() {
    return {
      headers: [
        {
          text: this.$t('tags.headers.name'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$t('tags.headers.color'),
          align: 'center',
          sortable: false,
          value: 'color'
        },
        {
          text: this.$t('tags.headers.match'),
          align: 'left',
          sortable: true,
          value: 'match'
        },
        {
          text: this.$t('tags.headers.match-algorithm'),
          align: 'left',
          sortable: true,
          value: 'matchAlgo'
        },
        {
          text: this.$t('tags.headers.match-insensitive'),
          align: 'center',
          sortable: true,
          value: 'matchInsensitive'
        },
        {
          text: this.$t('misc.actions'),
          align: 'center',
          sortable: false,
          value: 'action',
          width: '125px'
        }
      ]
    }
  },

  computed: {
    ...mapState('tags', ['loading', 'colors', 'tags'])
  },

  methods: {
    getColor(colorId) {
      const colorItem = (this.colors || []).find(item => item.value === colorId)
      return colorItem ? colorItem.text : null
    }
  }
}
</script>
