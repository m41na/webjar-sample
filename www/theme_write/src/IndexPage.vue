<template>
<div id="main">
	<div class="container">
		<div class="row">

			<!-- Content Start -->
			<div class="col-md-10 col-md-offset-1">
				<div class="col-md-12 page-body">
					<div class="row">


						<div class="sub-title">
							<a :href="navLink('home')"><h2>{{mapValues.homeTitle}}</h2></a> <a href="#" class="btn-header-search"><i class="icon-magnifier"></i></a>
						</div>

						<div class="col-md-12 content-page">

							<template v-for="(blog, index) in blogs"> <post-preview :index="index" :blog="blog"></post-preview> </template>

							<div class="col-md-12 text-center">
								<a href="javascript:void(0)" id="load-more-post" class="load-more-button">{{mapValues.loadButtonText}}</a>
								<div id="post-end-message"></div>
							</div>

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

import PostPreview from '../components/PostPreview.vue';
import AlertFeedback from '../components/AlertFeedback.vue';
import BlogSubscribe from '../components/BlogSubscribe.vue';
import PageFooter from '../components/PageFooter.vue';

import {store} from '../store/Store.js'

export default {
  name: 'about-us',
  computed: {
  	blogs(){
  		return store.state.blogs;
  	},
  	aboutUs() {
  		return store.state.aboutUs
  	},
  	mapValues() {
  		return store.state.mapValues
  	}
  },
  methods: {
  	navLink(page){
		return store.getters.navLinks[page] ;
	}
  },
  components: {
  	PostPreview,
    AlertFeedback,
    BlogSubscribe,
    PageFooter
  },
  mounted(){
  	/** Submit search request **/
    let search = $("input[name='search-query']");
    search.keypress(function(e){
    	var key = e.which;
    	if(key == 13){
    		$.ajax({
    			url: '/ws/blog/search?' + search.val(),
    			type: 'get',
    			success: function(data){
    				console.log(data);
					store.commit('refreshBlogs', data.blogs);
    			},
    			error: function(xhr){
    				console.log(xhr.responseText)
    			}
    		});
    		$(".header-search").removeClass("open");
    		return false;
    	}
    });
  }
}
</script>
