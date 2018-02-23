<template>
<nav class="navbar navbar-default navbar-custom navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header page-scroll">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-navbar-collapse">
                <span class="sr-only">Navigation</span>
                Menu <i class="fa fa-bars"></i>
            </button>
            <a class="navbar-brand" href="/">JarredWeb</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                 <li>
                    <a :href="navLink('home')">Home</a>
                </li>
                <li>
                    <a :href="navLink('about')">About</a>
                </li>
                <li>
                    <a :href="navLink('contact')">Contact</a>
                </li>
                <li>
                	<a :href="navLink('dynamic')">Dynamic</a>
                </li>
				<li>
					<a :href="navLink('admin')">Admin</a>
				</li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>
</template>

<script>
import {store} from '../store/Store.js';

export default{
	name: "navigation",
	methods: {
		navLink(page){
			return store.getters.navLinks[page] ;
		}
	}
}
</script>
