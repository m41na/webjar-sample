<template id="">
	<div class="col-md-12 blog-post" :style="displayStyle(index)">
		<div class="post-title">
			<a :href="readBlog(blog._id)"><h1>{{blog.title}}</h1></a>
		</div>
		<div class="post-info">
			<span>{{blog.publishDate}} / By <a :href="navLink('about')">{{blog.author.name}}</a></span>
		</div>

		<div v-html="blog.summary"></div>

		<a :href="readBlog(blog._id)" class="button button-style button-anim fa fa-long-arrow-right"><span>{{mapValues.readMoreText}}</span></a>
	</div>
</template>

<script>
import {store} from '../store/Store.js';

export default {
	name: "post-preview",
	props: ['blog','index'],
	methods: {
		readBlog(id){
			return store.getters.serverPath + "/ws/blog/" + id;
		},
		displayStyle(){
			if(this.index < 3){
				return "display:block";
			}
		},
		navLink(page){
			return store.getters.navLinks[page] ;
		}
	},
	computed: {
	  	mapValues() {
	  		return store.state.mapValues
	  	}
	}
}
</script>