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
      <v-icon v-else color="error">> mdi-minus-circle </v-icon>
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon class="mr-2" @click="$emit('edit', item.id)">
        mdi-pencil
      </v-icon>
      <v-icon @click="$emit('delete', item.id)">
        mdi-delete
      </v-icon>
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
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Color',
          align: 'center',
          sortable: false,
          value: 'color'
        },
        {
          text: 'Match',
          align: 'left',
          sortable: true,
          value: 'match'
        },
        {
          text: 'Match Algorithm',
          align: 'left',
          sortable: true,
          value: 'matchAlgo'
        },
        {
          text: 'Case Insensitive',
          align: 'center',
          sortable: true,
          value: 'matchInsensitive'
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: 'action',
          width: '100px'
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
