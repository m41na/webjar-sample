import Vue from 'vue';

import PostPage from './PostPage.vue'
import {store} from '../store/Store.js'

new Vue({
  el: '#app',
  store,
  render: h => h(PostPage)
})
