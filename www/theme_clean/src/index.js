import Vue from 'vue';

import IndexPage from './IndexPage.vue'
import {store} from '../store/Store.js'

new Vue({
  el: '#app',
  store,
  render: h => h(IndexPage)
})
