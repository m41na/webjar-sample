<template>
	<div id="comment" class="comment">
		<h3>{{mapValues.discussText}}</h3>

		<!-- Discussion Start -->
		<div class="post-comments">
			<ul v-if="comments && comments.length > 0" v-for="comment in comments">
				<blog-comment :comment="comment"></blog-comment>
			</ul>
		</div>
		<!-- Discussion End -->

		<!-- Post Form Start -->
		<div class="col-md-12">
			<div class="row">
				<form @submit.prevent="postComment">

					<div class="col-sm-3">
						<div class="form-group">
							<input type="email" id="email" class="form-control" name="email" v-model="email" placeholder="Your Email" @blur="lookupUserAccount">
						</div>
					</div>

					<div class="col-sm-3">
						<div class="form-group">
							<input type="text" id="firstName" class="form-control" name="firstName" v-model="firstName" placeholder="First Name">
						</div>
					</div>

					<div class="col-sm-3">
						<div class="form-group">
							<input type="text" id="lastName" class="form-control" name="lastName" v-model="lastName" placeholder="Last Name">
						</div>
					</div>

					<div class="col-sm-3">
						<div class="form-group">
							<input type="text" id="replyTo" class="form-control" name="replyTo" v-model="replyTo" placeholder="Reply To">
						</div>
					</div>

					<div v-if="!registered" class="col-sm-12">
						<div class="row">
							<div class="col-sm-4">
								<div class="form-group">
									<input type="text" id="username" class="form-control" name="username" v-model="username" placeholder="User Name">
								</div>
							</div>

							<div class="col-sm-4">
								<div class="form-group">
									<input type="password" id="password" class="form-control" name="password" v-model="password" placeholder="Password">
								</div>
							</div>

							<div class="col-sm-4">
								<div class="form-group">
									<button type="button" class="btn btn-primary btn-lg" @click="registerGuest">Register</button>
								</div>
							</div>
						</div>
					</div>

					<div v-else class="col-sm-12">
						<div class="textarea-message form-group">
							<textarea id="comment" :disabled="email==''" class="textarea-message form-control" name="comment" v-model="comment" placeholder="Your Comment"
								rows="5"></textarea>
						</div>
					</div>

					<div v-show="error!=''" class="col-sm-12">
						<div class="alert alert-warning alert-dismissible" role="alert">
							<button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="error==''">
								<span aria-hidden="true">&times;</span>
							</button>
							<strong>Warning!</strong> {{error}}.
						</div>
					</div>

					<div v-show="registered && comment!=''" class="text-center">
						<button type="submit" class="load-more-button">Send</button>
					</div>

				</form>

			</div>
		</div>
		<!-- Post Form End-->

	</div>
</template>

<script>
import Vue from 'vue';
import BlogComment from '../components/BlogComment.vue';
import {EventHub} from '../src/assets/event-hub.js';

import {store} from '../store/Store.js';

export default {
	name: "blog-discussion",
	data(){
		return {
			email: '',
			firstName: '',
			lastName: '',
			comment: '',
			password: '',
			username: '',
			user: {},
			error: '',
			registered: true,
			replyTo: ''
		}
	},
	computed: {
		comments(){
			console.log(store.state.blog.comments)
			return store.state.blog.comments;	
		},
		mapValues(){
			return store.state.mapValues
		}
	},
	methods: {
		postComment(e){
			let form = $(e.target);
			
			$.ajax({
				url: store.getters.serverPath + "/ws/blog/" + store.state.blog._id + "/comment",
				type: "post",
				dataType: "json",
				data: form.serialize(),
				success: function(data){
					console.log(data);
					store.commit('setBlog', data.blog)
				},
				error: function(xhr){
					console.log(xhr.responseText);
					if(xhr.responseJSON){
						self.error = xhr.responseJSON.error
						self.registered = false
					}
				}
			});
		},
		
		lookupUserAccount(){
			let self = this;
			$.ajax({
				url: store.getters.serverPath + "/ws/user/" + this.email,
				type: "get",
				dataType: "json",
				success: function(data){
					console.log(data);
					self.user = data.user;
					self.firstName = data.user.firstName
					self.lastName = data.user.lastName
					self.registered = true
					
					//sign in as guest
					$.ajax({
						url: store.getters.serverPath + '/ws/user/login/' + data.user.username,
						type: 'get',
						dataType: 'json',
						headers: {'Basics-Authorization-Request': 'bravo', 'Basics-Authorization-User-Id': data.user.username},
						success: function(data){
							console.log("guest signed in successfully");
						},
						error: function(xhr){
							console.log(xhr.responseText);
							if(xhr.responseJSON){
								self.error = xhr.responseJSON.error
							}
						}
					});
				},
				error: function(xhr){
					console.log(xhr.responseText);
					if(xhr.responseJSON){
						self.error = xhr.responseJSON.error
						self.registered = false
					}
				}
			});
		},
		
		registerGuest(){
			let user = {email: this.email, firstname: this.firstName, lastname: this.lastName, username: this.username, password: this.password, 'confirm-password': this.password};
			$.ajax({
				url: store.getters.serverPath + "/ws/admin/register/",
				type: "post",
				dataType: "json",
				data: user,
				success: function(data){
					console.log(data);
					self.user = data.user;
					self.registered = true
				},
				error: function(xhr){
					console.log(xhr.responseText);
					if(xhr.responseJSON){
						self.error = xhr.responseJSON.error
						self.registered = false
					}
				}
			});
		}
	},
	components: {
		BlogComment
	},
	
	created(){
		var self = this;
		EventHub.$on('replyTo', function(id){
			console.log('reply to ' + id);
			self.replyTo = id;
		});
	}
}
</script>