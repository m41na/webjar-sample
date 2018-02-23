<template>
	<li :data-id="comment._id">
		<div class="thumb">
			<img src="/theme/images/blog/comment.png" alt="">
		</div>

		<div class="text">
			<div class="cover">
				<h6>{{comment.author}}</h6>
				<span>{{comment.publishDate}}</span>
				<p>{{comment.content}}</p>
				<a href="#" class="reply" @click.prevent="replyTo(comment._id);">Reply</a>
			</div>
		</div>

		<ul v-if="comment.comments" v-for="comment in comment.comments">
			<blog-comment :comment="comment"></blog-comment>
		</ul>
	</li>
</template>

<script>
import Vue from 'vue';
import {EventHub} from '../src/assets/event-hub.js';

export default {
	name: "blog-comment",
	props: ['comment'],
	methods: {
		replyTo(id){
			EventHub.$emit('replyTo', id)
		}
	}
}
</script>