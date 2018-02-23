<template>
<div id="app">
	<div class="container">
		<div class="row">

			<!-- Content Start -->
			<div class="col-md-10 col-md-offset-1">
				<div class="col-md-12 page-body">
					<div class="row">

						<div class="sub-title">
							<h2>{{mapValues.themeName}}</h2>
							<a :href="navLink('home')"><i class="icon-home"></i></a>
						</div>

						<div class="col-md-12 content-page">

							<!-- Dynamic Content End Start -->
							<div class="col-md-12 blog-post">
								<div class="well well-sm">
									<p>{{content.par1}}</p>
								</div>

								<div class="list-group">
									<a href="#" v-for="item in items" class="list-group-item">
										<h4 class="list-group-item-heading">{{item.item_id}}</h4>
										<p class="list-group-item-text">{{item.item_code}}, {{item.item_name}}</p>
									</a>
								</div>

								<form role="form" class="form-inline">
									<div class="form-group">
										<label class="sr-only" for="item_id">Item Id</label> <input type="number" class="form-control" id="item_id" v-model="query.params['id']"
											placeholder="Item Id">
									</div>
									<button type="submit" class="btn btn-default" @click.prevent="queryById(query.name)">Fetch</button>
								</form>

								<ul class="list-group">
									<li v-for="(value, key) in query.result" class="list-group-item">{{key}} - {{value}}</li>
								</ul>
							</div>
							<!-- Dynamic Content End -->

						</div>
						
						<alert-feedback></alert-feedback>
						
					</div>
					
					<!-- Subscribe Form Start -->
					<blog-subscribe></blog-subscribe>
					<!-- Subscribe Form End -->
				
				</div>


				<!-- Footer Start -->
				<page-footer></page-footer>
				<!-- Footer End -->


			</div>
			<!-- Content End -->

		</div>
	</div>
</div>
</template>

<script>

import AlertFeedback from '../components/AlertFeedback.vue';
import BlogSubscribe from '../components/BlogSubscribe.vue';
import PageFooter from '../components/PageFooter.vue';

import {store} from '../store/Store.js'

export default {
  name: 'dynapage',
  data() {
		return {
			query: {
				name: "select_by_id",
				binding: "by_id",
				params: {id: ''},
				result: {}
			}
		}
	},
	computed: {
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
		navLink(page){
			return store.getters.navLinks[page] ;
		},
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
    AlertFeedback,
    BlogSubscribe,
    PageFooter
  }
}
</script>
