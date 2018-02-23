(function() {
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
    // platform is good!
  } else {
    // polyfill the platform!
    var e = document.createElement('script');
    e.src = 'webcomponents-lite.min.js';
    document.body.appendChild(e);
  }
})();

function importTemplate(id){
	let link = document.querySelector("link" + id);
	var content = link.import;
	return content.querySelector("template");
}

//define event hub
const eventHub = new Vue();

var widgetsModel = new Vue({
	data: {
		mapValues : {}
	}
});

//init store
$.ajax({
	url: "/site",
	type: "get",
	dataType: "json",
	success: function(data){
		console.log(data);
		Vue.set(widgetsModel, 'mapValues', data.site.mapValues);
	}
});

Vue.component("blog-subscribe", {
	template: importTemplate("#blog-subscribe-template"),
	data(){
		return {
			email: ''
		}
	},
	computed: {
		mapValues(){
			return widgetsModel.mapValues;
		}
	},
	methods: {
		subscribe(){
			$.ajax({
				url: "/user/subscribe/" + this.email,
				type: 'post',
				dataType: 'json',
				success: function(data){
					console.log(data);
					eventHub.$emit('alert', {type: 'success', message: "Thank you. Your subscription has been received. Stay tuned", close: 2000});
				},
				error: function(xhr){
					console.log(xhr.responseText);
					eventHub.$emit('alert', {type: 'warning', message: xhr.responseText});
				}
			});
		}
	}
});

Vue.component("alert-feedback", {
	template: importTemplate("#alert-feedback-template"),
	data(){
		return{
			alert: {
				message: '',
				type: 'warning'
			}
		}
	},
	computed: {
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
	},
	mounted (){
		let self = this;
		eventHub.$on('alert', function(ev){
			self.alert = ev;
			if(ev.close){
				setTimeout(function() {
			        self.alert.message = '';
			    }, ev.close);
			}
		});
	}
});

Vue.component("theme-footer", {
	template: importTemplate("#theme-footer-template"),
	computed: {
		mapValues(){
			return widgetsModel.mapValues;
		}
	}
});


