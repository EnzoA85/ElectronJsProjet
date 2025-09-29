<!-- UX/UI de la vue -->
<template>
    <h3>Liste de films</h3>
    <button @click="callApi" class="uk-button uk-button-primary">Appeler API</button>

    <div v-for="movie in movies" :key="movie.title">
        {{ movie.title }}
    </div>
</template>

<!-- Partie logique de la vue -->
<script setup>
import { ref } from 'vue';

const movies = ref([]);

async function callApi() {
    const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');
    const data = await res.json();
    // J'alimente les données dans la liste des films statefull
    movies.value=data;
}
</script>