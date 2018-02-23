import Vue from 'vue';

import ContactUs from './ContactUs.vue'
import {store} from '../store/Store.js'

new Vue({
  el: '#app',
  store,
  render: h => h(ContactUs)
})
