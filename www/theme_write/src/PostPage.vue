<template>
<div id="app">
	<div class="container">
		<div class="row">

			<!-- Content Start -->
			<div class="col-md-10 col-md-offset-1">
				<div class="col-md-12 page-body">
					<div class="row">

						<div class="sub-title">
							<h2>Back to List</h2>
							<a :href="navLink('home')"><i class="icon-home"></i></a>
						</div>


						<div class="col-md-12 content-page">
							<div class="col-md-12 blog-post">

								<!-- Post Headline Start -->
								<div class="post-title">
									<h1>{{blog.title}}</h1>
								</div>
								<!-- Post Headline End -->


								<!-- Post Detail Start -->
								<div class="post-info">
									<span>{{blog.publishDate}} / By <a href="category.html">{{displayName}}</a></span>
								</div>
								<!-- Post Detail End -->


								<div v-html="blog.content"></div>


								<!-- Post Author Bio Box Start -->
								<div class="about-author margin-top-70 margin-bottom-50"  v-if="author">

									<div class="picture">
										<img src="/media/profile/author.jpeg" class="img-responsive" alt="">
									</div>

									<div class="c-padding">
										<h3>
											${site.mapValues.articleByText} <a href="#" target="_blank">{{displayName}}</a>
										</h3>
										<p v-html="author.bio"></p>
										<ul class="social-icon">
											<li><a href="https://facebook.com/jarredweb" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a></li>
											<li><a href="https://twitter.com/jarredweb" target="_blank" class="twitter"><i class="fa fa-twitter"></i></a></li>
											<li><a href="https://www.linkedin.com/in/stephen-maina-714a9751/" target="_blank" class="linkedin"><i class="fa fa-linkedin"></i></a></li>
											<li><a href="https://github.com/m41na/webjar-starter" target="_blank" class="github"><i class="fa fa-github"></i></a></li>
											<li><a href="https://plus.google.com/108023899195605269098" target="_blank" class="google"><i class="fa fa-google-plus"></i></a></li>
										</ul>
									</div>
								</div>
								<!-- Post Author Bio Box End -->


								<!-- You May Also Like Start -->
								<blog-suggestions :featured="featured"></blog-suggestions>
								<!-- You May Also Like End -->


								<!-- Post Comment (Discuss) Start -->
								<blog-discussion></blog-discussion>
								<!-- Post Comment (Discuss) End -->

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

import BlogComment from '../components/BlogComment.vue';
import BlogDiscussion from '../components/BlogDiscussion.vue';
import BlogSuggestions from '../components/BlogSuggestions.vue';
import BlogSubscribe from '../components/BlogSubscribe.vue';
import PageFooter from '../components/PageFooter.vue';
import AlertFeedback from '../components/AlertFeedback.vue';
import {store} from '../store/Store.js'

export default {
  name: 'single-post',
  computed: {
  	blog(){
		return store.state.blog;
	},
	author(){
		return store.state.author;
	},
	displayName(){
		if(this.author){
			return this.author.firstName + " " + this.author.lastName;
		}
	},
	featured(){
		return store.state.featured
	}
  },
  filters: {
	shortSummary(input){
		return (input)? input.substr(0, 60) + " ..." : input;
	}
  },
  methods: {
  	navLink(page){
		return store.getters.navLinks[page] ;
	},
	loadBlogUrl(id){
		return store.getters.serverPath + "/ws/blog/" + id;
	}
  },
  components: {
  	BlogComment,
  	BlogDiscussion,
  	BlogSuggestions,
  	BlogSubscribe,
  	PageFooter,
  	AlertFeedback
  },
  mounted(){
  	var blogId = $("div[data-target-blog]").data("target-blog") || window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  	console.log("target blog => " + blogId);
	$.ajax({
		url: this.loadBlogUrl(blogId),
		type: "get",
		dataType: "json",
		success: function(data){
			console.log(data);
			store.commit('setBlog', data.blog);
		}
	});
  }
}
</script>

<style>
[v-cloak] > * { display:none }
[v-cloak]::before { content: "loading…" }
</style>
