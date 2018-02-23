<template>
<div id="app">
	<div class="container">
		<div class="row">

			<!-- Contact Start -->
			<div class="col-md-10 col-md-offset-1">
				<div class="col-md-12 page-body">
					<div class="row">

						<div class="sub-title">
							<h2>{{contactUs.title}}</h2>
							<a :href="navLink('home')"><i class="icon-home"></i></a>
						</div>

						<div class="col-md-12 content-page">
							<div class="col-md-12 blog-post">

								<div class="post-title margin-bottom-30">
									<h2>
										{{contactUs.subTitle}} <span class="main-color">{{contactUs.header}} </span>
									</h2>
								</div>

								<div v-for="(markup, index) in contactUs.content">
									<p v-html="markup"></p>
								</div>


								<!-- Contact Form Start -->
								<div class="row margin-top-30">
									<div class="col-md-12">

										<div class="row">
											<form>

												<div class="col-sm-6">
													<div class="form-group">
														<input type="text" id="name" class="form-control" placeholder="Your Name" name="name" v-model="visitor.name">
													</div>
												</div>

												<div class="col-sm-6">
													<div class="form-group">
														<input type="email" id="email" class="form-control" placeholder="Your Email" name="email" v-model="visitor.email">
													</div>
												</div>

												<div class="col-sm-6">
													<div class="form-group">
														<input type="text" id="website" class="form-control" placeholder="Website Url if any" name="website" v-model="visitor.website">
													</div>
												</div>

												<div class="col-sm-6">
													<div class="form-group">
														<input type="text" id="address" class="form-control" placeholder="+1-123-456-7890" name="phone" v-model="visitor.phone">
													</div>
												</div>

												<div class="col-sm-12">
													<select id="subject" class="form-group form-control" name="topic" v-model="visitor.topic">
														<option value="" selected disabled>Subject</option>
														<option v-for="topic in contactUs.topics">{{topic}}</option>
													</select>
												</div>

												<div class="col-sm-12">
													<div class="textarea-message form-group">
														<textarea id="message" class="textarea-message form-control" placeholder="Your Message" rows="5" name="message" v-model="visitor.message"></textarea>
													</div>
												</div>


												<div class="text-center">
													<button type="submit" class="load-more-button" @click.prevent="sendMessage">Send</button>
												</div>

											</form>
										</div>
									</div>
								</div>
								<!-- Contact Form End -->

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
			<!-- Contact End -->

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
  name: 'contact-us',
  computed: {
  	contactUs() {
  		return store.state.contactUs
  	},
  	visitor(){
  		return store.state.visitor
  	}
  },
  methods: {
  	navLink(page){
		return store.getters.navLinks[page] ;
	},
	sendMessage(){
		let self = this;
		//load initial data
		$.ajax({
			url: store.getters.serverPath +  "/ws/message",
			type: "post",
			data: self.visitor,
			dataType: "json",
			success: function(data){
				console.log(data);
				store.commit('setAlert', {type: 'success', message: "Thank you. Your message has been sent", close: 2000});
			},
			error: function(xhr){
				console.log(xhr.responseText);
				store.commit('setAlert', {type: 'warning', message: xhr.responseText});
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
