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
            rules="required|max:128"
            :name="$t('correspondents.fields.name')"
          >
            <v-text-field
              v-model="name"
              :label="$t('correspondents.fields.name')"
              prepend-icon="mdi-pencil"
              :error-messages="errors"
            >
            </v-text-field>
          </ValidationProvider>

          <!-- Match -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="max:256"
            :name="$t('correspondents.fields.match')"
          >
            <v-text-field
              v-model="match"
              :label="$t('correspondents.fields.match')"
              prepend-icon="mdi-filter"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>

          <!-- Match Algorithm -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            :name="$t('correspondents.fields.match-algorithm')"
          >
            <v-select
              v-model="matchAlgo"
              :label="$t('correspondents.fields.match-algorithm')"
              :hint="$t('correspondents.fields.match-algorithm-hint')"
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
            <v-checkbox
              v-model="matchInsensitive"
              :label="$t('correspondents.fields.match-insensitive')"
            >
            </v-checkbox>
          </span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">
            {{ $t('misc.cancel') }}
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
export default {
  props: {
    // Set this to enter edit-mode
    correspondent: {
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
      match: null,
      matchAlgo: 1,
      matchInsensitive: true
    }
  },

  computed: {
    title() {
      return this.correspondent
        ? this.$t('correspondents.title-edit')
        : this.$t('correspondents.title-add')
    },

    submitText() {
      return this.correspondent
        ? this.$t('correspondents.actions.update')
        : this.$t('correspondents.actions.create')
    }
  },

  watch: {
    correspondent: {
      handler: function(correspondent) {
        // if this is changed, we should update the internal values
        if (correspondent) {
          this.name = correspondent.name
          this.color = correspondent.color
          this.match = correspondent.match
          this.matchAlgo = correspondent.matchAlgo
          this.matchInsensitive = correspondent.matchInsensitive
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

        if ((this.correspondent || {}).id) {
          // Update correspondent
          this.$store
            .dispatch('correspondents/update', {
              id: this.correspondent.id,
              name: this.name,
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
          // Add correspondent
          this.$store
            .dispatch('correspondents/add', {
              name: this.name,
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
