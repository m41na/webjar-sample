<template>
	<transition name="slide-fade">
		<div class="col-md-12" v-if="alert.message">
			<hr>
			<div class="alert alert-dismissible" :class="alertType" role="alert">
			  	<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" @click="closeAlert">&times;</span></button>
			  	{{alert.message}}
			</div>
		</div>
	</transition>
</template>	

<script>

import {store} from '../store/Store.js'

export default {
  name: 'alert-feedback',
  watch:{
		alert(val){
			if(val.close){
				setTimeout(function() {
			        store.state.alert.message = '';
			    }, val.close);
			}
		}
	},
	computed: {
		alert(){
	  		return store.state.alert;
	  	},
		alertType(){
			switch(this.alert.type){
			case 'warning':
				return 'alert-warning';
			case 'success':
				return 'alert-success';
			default:
				return 'alert-info';	
			}
		}
	},
	methods: {
		closeAlert(){
			this.alert.message = '';
		}
	}
}
</script>