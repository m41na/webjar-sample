var BlogPreview=Vue.component("blog-preview",{template:"#blog-preview",data:()=>({blog:{}}),computed:{blogAuthor(){return this.blog.author?this.blog.author.name:""}},methods:{editorHref:e=>"/ws/admin/blog/"+e+"/editor"},mounted(){let e=this;var t=document.currentScript.dataset.id;$.ajax({url:"/ws/admin/blog/"+t,type:"get",dataType:"json",success:function(t){console.log(t),e.blog=t.blog}})}}),AlertFeedback=Vue.component("alert-feedback",{template:"#alert-feedback",data:()=>({alert:{message:"",type:"warning"}}),computed:{alertType(){switch(this.alert.type){case"warning":return"alert-warning";case"success":return"alert-success";default:return"alert-info"}}},methods:{closeAlert(){this.alert.message=""}},mounted(){let e=this;eventHub.$on("alert",function(t){e.alert=t,t.close&&setTimeout(function(){e.alert.message=""},t.close)})}});const eventHub=new Vue;var app=new Vue({el:"#app"});