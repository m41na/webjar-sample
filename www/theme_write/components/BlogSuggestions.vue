<template>
	<div class="you-may-also-like margin-top-50 margin-bottom-50">
		<h3>{{mapValues.suggestionText}}</h3>
		<div class="row">

			<div v-for="blog in featured" class="col-md-4 col-sm-6 col-xs-12">
				<a :href="readBlog(blog._id)"><p v-html="blog.title"></p></a>
			</div>
		</div>
	</div>
</template>

<script>
import {store} from '../store/Store.js'

export default {
	name: "blog-suggestions",
	computed: {
		featured(){
			return store.state.featured
		},
		mapValues(){
			return store.state.mapValues
		}
	},
	methods: {
		readBlog(id){
			return "/ws/blog/" + id;
		}
	}
}
</script>