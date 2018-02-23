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
                
                <template v-for="(blog, index) in blogs"> <post-preview :index="index" :blog="blog"></post-preview> </template>
                
                <!-- Pager -->
                <ul class="pager">
                    <li class="next">
                        <a href="#">Older Posts &rarr;</a>
                    </li>
                </ul>
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
import PostPreview from '../components/PostPreview.vue';
import {store} from '../store/Store.js'

export default {
  name: 'home-page',
  data(){
  	return {
  	  header_img: '/img/home-bg.jpg',
  	  title: 'Webjar Blog'
  	}
  },
  computed: {
  	headerImage(){
  		return store.getters.assetsPath + this.header_img;
  	},
  	blogs(){
  		return store.state.blogs
  	}
  },
  components: {
  	Navigation,
  	PageHeader,
  	PageFooter,
  	PostPreview
  }
}
</script>
