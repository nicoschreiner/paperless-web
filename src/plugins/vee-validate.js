import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import de from 'vee-validate/dist/locale/de.json'

// Adding rules
extend('required', required)
extend('max', max)

// Localize
localize({
  en: en,
  'de-DE': de
})
localize(navigator.language)

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
