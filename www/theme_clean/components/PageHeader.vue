<template>
<header class="intro-header" :style="bgImage">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div class="page-heading">
                    <h1>{{title}}</h1>
                    <hr class="small">
                    <span class="subheading">This is what I do.</span>
                </div>
            </div>
        </div>
    </div>
</header>
</template>

<script>

export default {
  name: 'page-header',
  props: ['header_img', 'title'],
  computed: {
  	bgImage(){
  		return "background-image: url('" + this.header_img + "')";
  	}
  }
}
</script>