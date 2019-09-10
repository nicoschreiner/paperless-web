<template>
  <v-card>
    <v-form @submit.prevent="submit">
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text>
          <!-- Name -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:100"
            name="Name"
          >
            <v-text-field
              v-model="name"
              label="Name"
              prepend-icon="mdi-pencil"
              :error-messages="errors"
            >
            </v-text-field>
          </ValidationProvider>

          <!-- Color -->
          <ValidationProvider v-slot="{ errors }" rules="required" name="Color">
            <v-select
              v-model="color"
              label="Color"
              :items="colors"
              :error-messages="errors"
            >
              <template v-slot:prepend>
                <v-icon :color="colorHex">mdi-palette</v-icon>
              </template>

              <template v-slot:selection="{ item }">
                <span :style="{ color: item.text }">{{ item.text }}</span>
              </template>

              <template v-slot:item="{ item }">
                <v-list-item-avatar>
                  <v-avatar :color="item.text"></v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-select>
          </ValidationProvider>

          <!-- Match -->
          <ValidationProvider v-slot="{ errors }" rules="max:256" name="Match">
            <v-text-field
              v-model="match"
              label="Match"
              prepend-icon="mdi-filter"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>

          <!-- Match Algorithm -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="Match Algorithm"
          >
            <v-select
              v-model="matchAlgo"
              label="Match Algorithm"
              hint="Which algorithm you want to use when matching text to the OCR'd PDF?"
              persistent-hint
              prepend-icon="mdi-filter"
              :items="matchAlgoItems"
              :error-messages="errors"
            >
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-select>
          </ValidationProvider>

          <!-- Case Insensitive -->
          <span>
            <v-checkbox v-model="matchInsensitive" label="Case Insensitive">
            </v-checkbox>
          </span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">
            Cancel
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            :disabled="invalid"
            :loading="loading"
          >
            {{ submitText }}
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    // Set this to enter edit-mode
    tag: {
      type: Object,
      required: false,
      default: null
    }
  },

  data() {
    return {
      loading: false,
      matchAlgoItems: [
        {
          text: 'Any',
          value: 1,
          description:
            'Looks for any occurrence of any word provided in the PDF.'
        },
        {
          text: 'All',
          value: 2,
          description:
            'Requires that every word provided appear in the PDF, albeit not in the order provided.'
        },
        {
          text: 'Literal',
          value: 3,
          description: 'Text must appear in the PDF exactly as entered.'
        },
        {
          text: 'Regular Expression',
          value: 4,
          description:
            "Uses a regex to match the PDF. (If you don't know what a regex is, you probably don't want this option.)"
        },
        {
          text: 'Fuzzy Match',
          value: 5,
          description:
            'Looks for words or phrases that are mostly—but not exactly—the same, which can be useful for matching against documents containg imperfections that foil accurate OCR.'
        }
      ],

      // form-data
      name: null,
      color: 1,
      match: null,
      matchAlgo: 1,
      matchInsensitive: true
    }
  },

  computed: {
    ...mapState('tags', ['colors']),

    title() {
      return 'Add Tag'
    },

    submitText() {
      return this.tag ? 'Update' : 'Create'
    },

    colorHex() {
      const item = this.colors.find(item => item.value === this.color)
      return item ? item.text : null
    }
  },

  watch: {
    tag: {
      handler: function(tag) {
        // if this is changed, we should update the internal values
        if (tag) {
          this.name = tag.name
          this.color = tag.color
          this.match = tag.match
          this.matchAlgo = tag.matchAlgo
          this.matchInsensitive = tag.matchInsensitive
        }
      },
      immediate: true
    }
  },

  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate()

      if (valid) {
        this.loading = true
        this.$emit('click:save')

        if ((this.tag || {}).id) {
          // Update tag
          this.$store
            .dispatch('tags/update', {
              id: this.tag.id,
              name: this.name,
              color: this.color,
              match: this.match ? this.match : '',
              matchAlgo: this.matchAlgo,
              matchInsensitive: this.matchInsensitive
            })
            .then(() => {
              this.loading = false
              this.$emit('submit:success')
            })
            .catch(err => {
              this.$log.error(err)
              this.loading = false
              this.$emit('submit:fail')
            })
        } else {
          // Add tag
          this.$store
            .dispatch('tags/add', {
              name: this.name,
              color: this.color,
              match: this.match ? this.match : '',
              matchAlgo: this.matchAlgo,
              matchInsensitive: this.matchInsensitive
            })
            .then(() => {
              this.loading = false
              this.$emit('submit:success')
            })
            .catch(err => {
              this.$log.error(err)
              this.loading = false
              this.$emit('submit:fail')
            })
        }
      }
    },

    cancel() {
      this.$refs.observer.reset()
      this.loading = false
      this.$emit('click:cancel')
    }
  }
}
</script>
