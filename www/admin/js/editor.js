var BlogEditor=Vue.component("blog-editor",{template:"#blog-editor",data:()=>({blog:{},categories:[],editCategory:!1}),computed:{blogAuthor(){return this.blog.author?this.blog.author.name:""}},methods:{createCategory(e){console.log("create new category -> "+e),$.ajax({url:"/ws/admin/category/"+e,type:"post",dataType:"json",success:function(e){console.log(e),this.categories.push(e.category),eventHub.$emit("alert",{type:"success",message:"created category"})},error:function(e){eventHub.$emit("alert",{type:"warning",message:e.responseText})}})}},mounted(){var e=$("#editor").summernote({focus:!0});e.summernote("code",this.blog.content);let t=this;$("#save").on("click",function(o){var a=e.summernote("code");t.blog.content=a,console.log(JSON.stringify(t.blog)),$.ajax({url:"/ws/admin/blog/"+t.blog._id,type:"put",dataType:"json",data:t.blog,success:function(e){console.log(e),this.blog=e.blog},error:function(e){eventHub.$emit("alert",{type:"warning",message:e.responseText})}})}),$.ajax({url:"/ws/category",type:"get",dataType:"json",success:function(e){console.log(e),t.categories=e.categories},error:function(e){eventHub.$emit("alert",{type:"warning",message:e.responseText})}});var o=document.currentScript.dataset.id;$.ajax({url:"/ws/admin/blog/"+o,type:"get",dataType:"json",success:function(o){console.log(o),t.blog=o.blog,e.summernote("code",o.blog.content)},error:function(e){eventHub.$emit("alert",{type:"warning",message:e.responseText})}})}}),AlertFeedback=Vue.component("alert-feedback",{template:"#alert-feedback",data:()=>({alert:{message:"",type:"warning"}}),computed:{alertType(){switch(this.alert.type){case"warning":return"alert-warning";case"success":return"alert-success";default:return"alert-info"}}},methods:{closeAlert(){this.alert.message=""}},mounted(){let e=this;eventHub.$on("alert",function(t){e.alert=t,t.close&&setTimeout(function(){e.alert.message=""},t.close)})}});const eventHub=new Vue;var app=new Vue({el:"#app"});