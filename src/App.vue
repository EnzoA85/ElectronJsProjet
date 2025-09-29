<template>
	<div>
		<router-view v-slot="{ Component }">
			<component :is="Component" v-if="route.name === 'PageLogin' || route.name === 'PageInscription'" />
			<div v-else>
				<nav class="uk-navbar-transparent" data-uk-navbar>
					<div class="uk-navbar-center uk-visible@m">
						<ul class="uk-navbar-nav">
							<li><router-link to="/articles">Articles</router-link></li>
							<li>
								<a>Collections <span data-uk-icon="icon: triangle-down"></span></a>
								<div class="uk-navbar-dropdown">
									<ul class="uk-nav uk-navbar-dropdown-nav">
										<li><a>Landscape</a></li>
										<li><a>Nature</a></li>
										<li><a>Social</a></li>
										<li><a>Urban</a></li>
										<li><a>Music</a></li>
									</ul>
								</div>
							</li>
							<li><a>Most Viewed</a></li>
						</ul>
					</div>
					<div class="uk-navbar-right" style="margin-right:20px;">
						<ul class="uk-navbar-nav">
							<li>
								<a data-uk-icon="icon:user"></a>
								<div class="uk-navbar-dropdown uk-navbar-dropdown-bottom-left">
									<ul class="uk-nav uk-navbar-dropdown-nav">
										<li class="uk-nav-header uk-text-small uk-text-primary">YOUR ACCOUNT</li>
										<li><a><span data-uk-icon="icon: info"></span> Summary</a></li>
										<li><a><span data-uk-icon="icon: refresh"></span> Edit</a></li>
										<li><a><span data-uk-icon="icon: settings"></span> Configuration</a>
										</li>
										<li class="uk-nav-divider"></li>
										<li><a><span data-uk-icon="icon: image"></span> Your Pictures</a></li>
										<li class="uk-nav-divider"></li>
										<li><a href="#"><span data-uk-icon="icon: sign-out"></span> Logout</a></li>

									</ul>
								</div>
							</li>
							<li class="uk-hidden@m"><a class="uk-navbar-toggle" data-uk-toggle
									data-uk-navbar-toggle-icon href="#"></a></li>
						</ul>
					</div>
				</nav>
				<component :is="Component" />
			</div>
		</router-view>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>