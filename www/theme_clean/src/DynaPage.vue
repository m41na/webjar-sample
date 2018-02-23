<template>
<div id="app">
	<!-- Navigation -->
    <navigation></navigation>

    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    <page-header :header_img="headerImage" :title="title"></page-header>

    <!-- Main Content -->
	<div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div class="panel panel-info">
                    <div class="panel-heading">Items List</div>
                    
                </div>
                <hr>
            </div>
        </div>
    </div>
    
    <hr>

    <!-- Footer -->
    <page-footer></page-footer>
</div>
</template>

<script>

import Navigation from '../components/Navigation.vue';
import PageHeader from '../components/PageHeader.vue';
import PageFooter from '../components/PageFooter.vue';
import {store} from '../store/Store.js'

export default {
  name: 'dynapage',
  data(){
  	return {
  		header_img: '/img/post-bg.jpg',
  		title: 'Dynamic Page',
  		query: {
			name: "select_by_id",
			binding: "by_id",
			params: {id: ''},
			result: {}
		}
  	}
  },
  computed: {
  	headerImage(){
  		return store.getters.assetsPath + this.header_img;
  	},
  	items(){
		return store.state.items
	},
	content(){
		return store.state.content
	},
	mapValues(){
		return store.state.mapValues
	}
  },
  methods: {
  	queryById(query){
  		let self = this;
  		//load query data
		$.ajax({
			url: "/ws/q/dynapage/" + query,
			type: "post",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(self.query),
			success: function(data){
				console.log(data);
				self.query.result = data[self.query.binding];
			}
		});
  	}
  },
  components: {
  	Navigation,
  	PageHeader,
  	PageFooter
  }
}
</script>
