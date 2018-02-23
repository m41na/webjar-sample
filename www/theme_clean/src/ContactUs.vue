<template>
<div id="app">
    <!-- Navigation -->
    <navigation></navigation>

    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    <page-header :header_img="headerImage" :title="title"></page-header>

    <!-- Main Content -->
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <p>Want to get in touch with me? Fill out the form below to send me a message and I will try to get back to you within 24 hours!</p>
                <!-- Contact Form - Enter your email address on line 19 of the mail/contact_me.php file to make this form work. -->
                <!-- WARNING: Some web hosts do not allow emails to be sent through forms to common mail hosts like Gmail or Yahoo. It's recommended that you use a private domain email address! -->
                <!-- NOTE: To use the contact form, your site must be on a live web host with PHP! The form will not work locally! -->
                <form name="sentMessage" id="contactForm" novalidate>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Name</label>
                            <input type="text" class="form-control" placeholder="Name" id="name" required data-validation-required-message="Please enter your name." v-model="visitor.name">
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Email Address</label>
                            <input type="email" class="form-control" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address." v-model="visitor.email">
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Phone Number</label>
                            <input type="tel" class="form-control" placeholder="Phone Number" id="phone" required data-validation-required-message="Please enter your phone number." v-model="visitor.phone">
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Message</label>
                            <textarea rows="5" class="form-control" placeholder="Message" id="message" required data-validation-required-message="Please enter a message." v-model="visitor.message"></textarea>
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <br>
                    <div id="success">
                    	<alert-feedback></alert-feedback>
                    </div>
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <button type="submit" class="btn btn-default" @click.prevent="sendMessage">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <hr>

    <!-- Footer -->
    <page-footer></page-footer>

</div>
</template>

<script>

import Navigation from '../components/Navigation.vue';
import PageHeader from '../components/PageHeader.vue';
import PageFooter from '../components/PageFooter.vue';
import AlertFeedback from '../components/AlertFeedback.vue';
import {store} from '../store/Store.js'

export default {
  name: 'contact-us',
  data(){
  	return {
  		header_img: '/img/contact-bg.jpg',
  		title: 'Contact Me'
  	}
  },
  computed: {
  	headerImage(){
  		return store.getters.assetsPath + this.header_img;
  	},
  	contactUs() {
  		return store.state.contactUs
  	},
  	visitor(){
  		return store.state.visitor;
  	}
  },
  components: {
  	Navigation,
  	PageHeader,
  	PageFooter,
  	AlertFeedback
  },
  methods: {
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
  }
}
</script>
