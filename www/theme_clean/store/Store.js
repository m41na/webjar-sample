import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
	  aboutUs: {
		title: "",
		subTitle: "",
		header: "",
		subHeader: "",
		actionBtn: "",
		subscribeText: "",
		skills: [],
		content: {}
	  },
	  contactUs: {
		title: "",
		subTitle: "",
		header: "",
		subHeader: "",
		content: {},
		topics: [],
		phone: "",
		email: "",
		times: "",
		social: ""
	},
	visitor: {
		name: '',
		email: '',
		phone: '',
		website: '',
		topic: '',
		message: ''
	},
	mapValues : {
		  
	},
	items :{},
	content :{},
	alert: {
		message: '',
		type: 'warning'
	},
	blog: {
		author: {}
	},
	blogs: [],
	_id: '',
	page: {
		num: 1,
		size: 3,
		start: 0
	},
	userInfo: {},
	subValues: {
		env: "live",
		assetsPath: {
			dev: "/theme",
			live: "/theme"
		}
	}
  },
  getters: {
		selectedBlog(state){
			let val = state.blogs.filter(x=>x._id == state._id);
			return val.length > 0? val[0] : {}
		},
		pagerBlogList(state){
			let pageNum = state.page.num;
			let pageSize = state.page.size;
			let listLen = state.blogs.length;
			let startIndex = state.page.start;
			let nextStartIndex =  ((pageNum - 1) * pageSize) + pageSize;
			let endIndex = nextStartIndex > listLen? listLen : nextStartIndex;
			return state.blogs.slice(startIndex, endIndex);
		},
		serverPath(state){
			return (state.subValues.serverPath)? state.subValues.serverPath[state.subValues.env] : ""
		},
		assetsPath(state){
			return (state.subValues.assetsPath)? state.subValues.assetsPath[state.subValues.env] : ""
		},
		navLinks(state){
			return (state.subValues.navLinks)? state.subValues.navLinks[state.subValues.env] : ""
		}
	},
  mutations: {
	  setAboutUs(state, about){
		  state.aboutUs = about;
	  },
	  setContactUs(state, contact){
		  state.contactUs = contact;
	  },
	  setMapValues (state, values) {
		  state.mapValues = values;
	  },
	  setAlert(state, val){
		  state.message = val.message;
		  state.type = val.type || 'warning'
	  },
	  setDynaPage(state, data){
		state.items = data.all_items;
		state.content = data.content;
	  },
	  setBlog(state, blog){
		state.blog = blog;
	  },
	  refreshBlogs(state, blogs){
		state.blogs = blogs;
	  },
	  updateBlog(state, blog){
		let i = state.blogs.findIndex(e=>e._id = blog._id);
		state.blogs.splice(i, 1, blog);
	  },
	  fetchBlogs(state, id){
		 $.ajax({
			url: store.getters.serverPath + "/ws/blog",
			type: "get",
			dataType: "json",
			success: function(data){
			  console.log(data);
			  store.commit('refreshBlogs', data.blogs);
			}
		});
	  },
	  fetchBlog(state, id){
		  $.ajax({
			url: store.getters.serverPath + "/ws/blog/" + id,
			type: "get",
			dataType: "json",
			success: function(data){
				console.log(data);
				store.commit('setBlog', data.blog);
			}
		});
	  }
  },
  actions: {
	  fetchBlogs(context){
		  context.commit('fetchBlogs');
	  },
	  fetchBlog(context, id){
		  context.commit('fetchBlog', id);
	  }
  }
});

(function(ctx){
	$.ajax({url: "/theme/static_data.json", type: "get", dataType: "json", success: function(data){
			ctx.state.subValues = data;
			ctx.state.subValues.init = false;
			ctx.dispatch('fetchBlogs');
		}
	});
}(store))