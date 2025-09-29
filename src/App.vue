<template>
	<div>
		<router-view v-slot="{ Component }">
			<component :is="Component" v-if="route.name === 'PageLogin'" />
			<div v-else>
				<h1>Appli-quons-nous</h1>
				<ul uk-tab>
					<li><router-link to="/articles">Articles</router-link></li>
					<li><a href="#">Item</a></li>
				</ul>
				<component :is="Component" />
			</div>
		</router-view>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>