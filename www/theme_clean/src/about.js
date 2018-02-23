import Vue from 'vue';

import AboutUs from './AboutUs.vue'
import {store} from '../store/Store.js'

new Vue({
  el: '#app',
  store,
  render: h => h(AboutUs)
})
