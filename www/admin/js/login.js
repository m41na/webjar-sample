var login=Vue.component("login",{template:"#login-template",data:()=>({username:"",password:"",email:"",firstname:"",lastname:"",remember:!1,view:"login",error:"",errors:{}}),methods:{login(e){var r=$(e.target),o=this;localStorage.setItem("rememberMe",JSON.stringify({remember:o.remember,username:o.username})),$.ajax({url:r.attr("action"),type:r.attr("method"),data:r.serialize(),dataType:"json",headers:{"Basics-Authorization-Request":"bravo","Basics-Authorization-User-Id":o.username},success:function(e){console.log(e),window.location.pathname="/ws/admin/home"},error(e){if(console.log(e.responseText),e.responseJSON&&e.responseJSON.errors)try{o.errors=e.responseJSON.errors}catch(e){console.log("unable to parse json from response"),o.errors={}}else o.error=e.responseText}})},register(e){var r=$(e.target),o=this;$.ajax({url:r.attr("action"),type:r.attr("method"),data:r.serialize(),dataType:"json",success:function(e){console.log(e),o.view},error(e){if(console.log(e.responseText),e.responseJSON&&e.responseJSON.errors)try{o.errors=e.responseJSON.errors}catch(e){console.log("unable to parse json from response"),o.errors={}}else o.error=e.responseText}})},recover(e){var r=$(e.target),o=this;$.ajax({url:r.attr("action"),type:r.attr("method"),data:r.serialize(),dataType:"json",success:function(e){console.log(e),o.view},error(e){if(console.log(e.responseText),e.responseJSON&&e.responseJSON.errors)try{o.errors=e.responseJSON.errors}catch(e){console.log("unable to parse json from response"),o.errors={}}else o.error=e.responseText}})}},mounted(){let e=localStorage.getItem("rememberMe");try{let r=JSON.parse(e);this.remember=r.remember,this.remember&&(this.username=r.username)}catch(e){console.log("unable to parse stored item"),localStorage.setItem("rememberMe",JSON.stringify({remember:!1,username:""}))}}}),app=new Vue({el:"#app"});