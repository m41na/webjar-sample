import Vue from 'vue';

import DynaPage from './DynaPage.vue'
import {store} from '../store/Store.js'

new Vue({
  el: '#app',
  store,
  render: h => h(DynaPage),
  mounted(){
	  $.ajax({
		url: "http://localhost:7080/ws/site",
		type: "get",
		dataType: "json",
		success: function(data){
			console.log(data);
			store.commit('setMapValues', data.site.mapValues);
		}
	});
	  
	  $.ajax({
			url: "http://localhost:7080/ws/d/dynapage",
			type: "get",
			dataType: "json",
			success: function(data){
				console.log(data);
				store.commit('setDynaPage', data);
			}
		});
  }
})
