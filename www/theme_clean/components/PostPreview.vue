<template id="post-preview-template">
<div>
	<div class="post-preview">
        <a :href="readBlog(blog._id)">
            <h2 class="post-title">
                {{blog.title}}
            </h2>
            <h3 class="post-subtitle">
                {{blog.summary}}
            </h3>
        </a>
        <p class="post-meta">Posted by <a href="#">{{blog.author.name}}</a> on {{blog.publishDate}}</p>
    </div>
    <hr>
</div>
</template>

<script>
import {store} from '../store/Store.js';

export default{
	name: "post-preview",
	props: ['blog','index'],
	methods: {
		readBlog(id){
			return store.getters.serverPath + "/ws/blog/" + id;
		}
	}
}
</script>