<template>
	<div class="col-md-12 page-body margin-top-50 footer">
		<footer>
			<ul class="menu-link">
				<li><a :href="navLink('home')">{{mapValues.homeLink}}</a></li>
				<li><a :href="navLink('about')">{{mapValues.aboutLink}}</a></li>
				<li><a :href="navLink('contact')">{{mapValues.contactLink}}</a></li>
				<li>
					<ul class="nav">
						<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
							aria-expanded="false">More<span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a :href="navLink('dynamic')">Dynapage</a></li>
								<li><a :href="navLink('admin')">Admin</a></li>
							</ul></li>
					</ul>
				</li>
			</ul>
	
			<p>&copy; {{mapValues.copyrightText}}</p>
	
	
			<!-- UiPasta Credit Start -->
			<div class="uipasta-credit">
				{{mapValues.designedByText}} <a href="http://www.uipasta.com" target="_blank">{{mapValues.designerText}}.</a>
				{{mapValues.poweredByText}} <a href="https://www.jarredweb.com" target="_blank">{{mapValues.engineText}}</a>
			</div>
			<!-- UiPasta Credit End -->
	
	
		</footer>
	</div>
</template>

<script>
import {store} from '../store/Store.js'

export default {
  name: 'theme-footer',
  computed: {
	mapValues(){
		return store.state.mapValues;
	}
  },
  methods: {
	navLink(page){
		return store.getters.navLinks[page] ;
	}
  }
}
</script>