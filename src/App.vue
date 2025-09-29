<template>
	<h1>Appli-quons-nous</h1>
	<ul uk-tab>
		<li class="uk-active"><router-link to="/">Accueil</router-link></li>
		<li><router-link to="/page-2">page Two</router-link></li>
		<li><a href="#">Item</a></li>
	</ul>
	<router-view />
</template>