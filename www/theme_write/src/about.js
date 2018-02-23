import Vue from 'vue';

import AboutUs from './AboutUs.vue'
import {store} from '../store/Store.js'

new Vue({
  el: '#app',
  store,
  render: h => h(AboutUs),
  mounted(){
	  $.ajax({
		url: "http://localhost:7080/ws/site",
		type: "get",
		dataType: "json",
		success: function(data){
			console.log(data);
			store.commit('setAboutUs', data.site.aboutUs);
			store.commit('setMapValues', data.site.mapValues);
		}
	});
  }
})
