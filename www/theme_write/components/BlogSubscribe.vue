<template>
	<div class="col-md-8 col-md-offset-2">
		<form method="post" @submit.prevent="subscribe">

			<div class="subscribe-form margin-top-20">
				<input id="mc-email" type="email" placeholder="Email Address" name="email" v-model="email" class="text-input">
				<button class="submit-btn" type="submit">{{mapValues.submitButtonText}}</button>
			</div>
			<p style="text-align: center">{{mapValues.subscriberText}}</p>
			<label for="mc-email" class="mc-label"></label>
		</form>
	</div>
</template>

<script>
import {EventHub} from '../src/assets/event-hub.js';
import {store} from '../store/Store.js'

export default {
  name: 'blog-subscribe',
  data(){
		return {
			email: ''
		}
	},
	computed: {
		mapValues(){
			return store.state.mapValues;
		}
	},
	methods: {
		subscribe(){
			let self = this;
			$.ajax({
				url: store.getters.serverPath +  "/ws/user/subscribe/" + this.email,
				type: 'post',
				dataType: 'json',
				success: function(data){
					console.log(data);
					self.email = '';
					store.commit('setAlert', {type: 'success', message: "Thank you. Your subscription has been received. Stay tuned", close: 2000});
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