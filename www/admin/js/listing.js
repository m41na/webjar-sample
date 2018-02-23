var ListPager=Vue.component("list-pager",{template:"#list-pager",computed:{page:()=>store.state.page.num,maxPage(){let e=store.state.blogs.length%store.state.page.size,t=store.state.blogs.length/store.state.page.size;return 0==e?t:Math.floor(t)+1}},methods:{onNext(){console.log("go next"),store.state.page.num<this.maxPage&&(store.state.page.num++,store.state.page.start+=store.state.page.size)},onPrev(){console.log("go prev"),store.state.page.num>1&&(store.state.page.num--,store.state.page.start-=store.state.page.size)}}}),BlogsList=Vue.component("blogs-list",{template:"#blogs-list",computed:{blogs:()=>store.getters.pagerBlogList},methods:{dropBlog:function(e){eventHub.$emit("drop",{id:e})},createBlog:function(){eventHub.$emit("create")},togglePublish(e){eventHub.$emit("publish",{id:e})},previewHref:e=>"/ws/admin/blog/"+e+"/preview",editorHref:e=>"/ws/admin/blog/"+e+"/editor",commentsHref:e=>"/ws/admin/blog/"+e+"/comments"}}),AlertFeedback=Vue.component("alert-feedback",{template:"#alert-feedback",data:()=>({alert:{message:"",type:"warning"}}),computed:{alertType(){switch(this.alert.type){case"warning":return"alert-warning";case"success":return"alert-success";default:return"alert-info"}}},methods:{closeAlert(){this.alert.message=""}},mounted(){let e=this;eventHub.$on("alert",function(t){e.alert=t,t.close&&setTimeout(function(){e.alert.message=""},t.close)})}});const eventHub=new Vue,store=new Vuex.Store({state:{user:{},blogs:[],_id:"",page:{num:1,size:3,start:0},categories:[]},getters:{selectedBlog(e){let t=e.blogs.filter(t=>t._id==e._id);return t.length>0?t[0]:{}},pagerBlogList(e){let t=e.page.num,s=e.page.size,o=e.blogs.length,a=e.page.start,r=(t-1)*s+s,n=r>o?o:r;return e.blogs.slice(a,n)}},mutations:{updateBlog(e,t){let s=e.blogs.findIndex(e=>e._id==t._id);e.blogs.splice(s,1,t)},updateCategories(e,t){e.categories=t}}});var app=new Vue({el:"#app",methods:{onDrop(e){let t=store.state.blogs.findIndex(t=>t._id===e.id);var s=store.state.blogs.splice(t,1);$.ajax({url:"/ws/admin/blog/"+s[0]._id,type:"delete",dataType:"json",success:function(e){console.log(e),eventHub.$emit("alert",{type:"success",message:"dropped blog"})},error:function(e){eventHub.$emit("alert",{type:"warning",message:e.responseText})}})},onCreate(){submit("post","/ws/admin/blog/")},onPublish(e){$.ajax({url:"/ws/admin/blog/"+e.id+"/publish",type:"put",dataType:"json",success:function(e){console.log(e);let t=store.state.blogs.findIndex(t=>t._id===e.blog._id);store.state.blogs.splice(t,1,e.blog),eventHub.$emit("alert",{type:"success",message:"published blog"})},error:function(e){eventHub.$emit("alert",{type:"warning",message:e.responseText})}})}},mounted(){eventHub.$on("drop",this.onDrop),eventHub.$on("create",this.onCreate),eventHub.$on("publish",this.onPublish),$.ajax({url:"/ws/blog",type:"get",dataType:"json",success:function(e){for(var t=0;t<e.blogs.length;t++){let s=e.blogs[t];for(key in s)"_id"==key&&console.log(key+"-> "+s[key])}store.state.user=e.user,store.state.blogs=e.blogs}})}});