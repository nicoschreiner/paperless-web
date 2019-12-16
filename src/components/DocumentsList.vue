<template>
  <v-data-iterator :loading="loading" :items="documents">
    <template v-slot:default="props">
      <v-item-group multiple>
        <v-container>
          <v-row dense>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
            >
              <v-item v-slot:default="{ active, toggle }">
                <v-card outlined>
                  <v-list-item @click="toggle">
                    <v-scale-transition>
                      <v-list-item-avatar v-if="active"><v-icon color="success">mdi-check-circle</v-icon></v-list-item-avatar>
                    </v-scale-transition> 
                    <v-list-item-content>
                      <v-list-item-title class="headline">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <span v-on="on">{{ item.title }}</span>
                          </template>
                          {{ item.title }}
                        </v-tooltip>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ item.created | moment('YYYY/MM/DD') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-img :src="item.urlThumb">
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-btn color="primary" text @click="openPDF(item.urlFull)">Download</v-btn>
                    <v-spacer></v-spacer>
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="$emit('delete', item.id)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      {{ $t('misc.delete') }}
                    </v-tooltip>
                  </v-card-actions>

                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DocumentsList',

  data() {
    return {
    }
  },

  computed: {
    ...mapState('documents', ['loading', 'documents'])
  },

  methods: {
    openPDF(url) {
      if (url) {
        window.open(url)
      }
    }
  }
}
</script>
