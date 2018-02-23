<template>
<div id="app">
    <!-- Navigation -->
    <navigation></navigation>

    <!-- Main Content -->
    <div id="main">
	    <!-- Page Header -->
	    <!-- Set your background image for this header on the line below. -->
	    <header class="intro-header" :style="bgImage">
	        <div class="container">
	            <div class="row">
	                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
	                    <div class="post-heading">
	                        <h1>{{blog.title}}</h1>
	                        <h2 class="subheading">{{blog.summary | shortSummary}}</h2>
	                        <span class="meta">Posted by <a href="#">{{blog.author.name}}</a> on {{blog.dateCreated}}</span>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </header>
	
	    <!-- Post Content -->
	    <article>
	        <div class="container">
	            <div class="row">
	                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1" v-html="blog.content"></div>
	            </div>
	        </div>
	    </article>
	
	    <hr>
    </div>

    <hr>

    <!-- Footer -->
    <page-footer></page-footer>

</div>
</template>

<script>

import Navigation from '../components/Navigation.vue';
import PageFooter from '../components/PageFooter.vue';
import {store} from '../store/Store.js'

export default {
  name: 'single-post',
  data(){
  	return {
  		header_img: '/img/post-bg.jpg',
  	}
  },
  computed: {
  	bgImage(){
  		return "background-image: url('" + this.headerImage + "')";
  	},
  	headerImage(){
  		return store.getters.assetsPath + this.header_img;
  	},
  	blog(){
		return store.state.blog;
	}
  },
  filters: {
	shortSummary(input){
		return (input)? input.substr(0, 60) + " ..." : input;
	}
  },
  methods: {
	loadBlogUrl(id){
		return store.getters.serverPath + "/ws/blog/" + id;
	}
  },
  components: {
  	Navigation,
  	PageFooter
  },
  mounted (){
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
