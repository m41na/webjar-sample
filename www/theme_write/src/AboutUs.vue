<template>
<div id="app">
	<div class="container">
		<div class="row">

			<!-- About Me Start -->
			<div class="col-md-10 col-md-offset-1">
				<div class="col-md-12 page-body">
					<div class="row">

						<div class="sub-title">
							<h2>{{aboutUs.title}}</h2>
							<a :href="navLink('contact')"><i class="icon-envelope"></i></a>
						</div>


						<div class="col-md-12 content-page">
							<div class="col-md-12 blog-post">

								<div class="post-title margin-bottom-30">
									<h2>
										{{aboutUs.subTitle}} <span class="main-color">{{aboutUs.header}}</span>
									</h2>

								</div>

								<div v-for="(markup, index) in aboutUs.content">
									<p v-html="markup"></p>
								</div>

							</div>

						</div>
						
						<alert-feedback></alert-feedback>

					</div>


					<!-- Subscribe Form Start -->
					<blog-subscribe></blog-subscribe>
					<!-- Subscribe Form End -->

				</div>

				<!-- Footer Start -->
				<page-footer></page-footer>
				<!-- Footer End -->

			</div>
			<!-- About Me End -->

		</div>
	</div>
</div>
</template>

<script>

import AlertFeedback from '../components/AlertFeedback.vue';
import BlogSubscribe from '../components/BlogSubscribe.vue';
import PageFooter from '../components/PageFooter.vue';

import {store} from '../store/Store.js'

export default {
  name: 'about-us',
  computed: {
  	aboutUs() {
  		return store.state.aboutUs
  	}
  },
  methods: {
	navLink(page){
		return store.getters.navLinks[page] ;
	}
  },
  components: {
    AlertFeedback,
    BlogSubscribe,
    PageFooter
  }
}
</script>
