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
	            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?</p>
	            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!</p>
	            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum molestiae debitis nobis, quod sapiente qui voluptatum, placeat magni repudiandae accusantium fugit quas labore non rerum possimus, corrupti enim modi! Et.</p>
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
import {store} from '../store/Store.js'

export default {
  name: 'about-us',
  data(){
  	return {
  		header_img: '/img/about-bg.jpg',
  		title: 'About Me'
  	}
  },
  computed: {
  	headerImage(){
  		return store.getters.assetsPath + this.header_img;
  	},
  	aboutUs() {
  		return store.state.aboutUs
  	}
  },
  components: {
  	Navigation,
  	PageHeader,
  	PageFooter
  }
}
</script>
