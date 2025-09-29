<template>
    <div>
        <section class="uk-section uk-section-small">
            <div id="author-wrap" class="uk-container uk-container-small">
                <div class="uk-grid uk-grid-medium uk-flex uk-flex-middle" data-uk-grid>
                    <div class="uk-width-auto">
                        <img src="https://unsplash.it/80/80/?random" alt="" class="uk-border-circle">
                    </div>
                    <div class="uk-width-expand">
                        <h4 class="uk-margin-remove uk-text-bold">{{ article?.author || 'Auteur inconnu' }}</h4>
                        <span class="uk-text-small uk-text-muted">Auteur de l'article</span>
                    </div>
                    <div class="uk-width-auto">
                        <div class="uk-inline">
                            <a class="uk-icon-button" data-uk-icon="icon:more-vertical"></a>
                            <div data-uk-dropdown="mode:click; pos: bottom-right; boundary:#author-wrap">
                                <ul class="uk-nav uk-dropdown-nav">
                                    <li class="uk-nav-header">Actions</li>
                                    <li><a>Noter cet auteur</a></li>
                                    <li><a>Suivre cet auteur</a></li>
                                    <li><a>Mettre en favori</a></li>
                                    <li><a>Voir plus d'articles</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="uk-container uk-container-small">
            <hr class="uk-margin-remove">
        </div>

        <section class="uk-section uk-article">
            <div class="uk-container uk-container-small">
                <div v-if="loading" class="uk-text-center uk-margin-large-top">
                    <span data-uk-spinner></span> Chargement de l'article...
                </div>
                <div v-else-if="article">
                    <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-bottom">
                        <h2 class="uk-text-bold uk-h1 uk-margin-remove-adjacent uk-margin-remove-top uk-margin-right">{{
                            article.title }}</h2>
                        <div>
                            <div class="uk-inline">
                                <a class="uk-icon-button" data-uk-icon="icon:more-vertical"></a>
                                <div data-uk-dropdown="mode:click; pos: bottom-right; boundary:#author-wrap">
                                    <ul class="uk-nav uk-dropdown-nav">
                                        <li class="uk-nav-header">Actions</li>
                                        <li><a @click.prevent="editArticle">Modifier</a></li>
                                        <li><a @click.prevent="deleteArticle">Supprimer</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="uk-article-meta">Auteur : {{ article.author }}</p>
                    <p class="uk-text-lead">{{ article.desc }}</p>
                    <img v-if="article.imgPath" :src="article.imgPath" alt="Image article"
                        style="width:100%;max-width:600px;object-fit:cover;" class="uk-margin-bottom">
                </div>
                <div v-else class="uk-text-center uk-margin-large-top">
                    <span class="uk-text-danger">Article introuvable.</span>
                </div>
            </div>
        </section>
        <div class="uk-container uk-container-small uk-margin">
            <a class="uk-button uk-button-default" @click="$router.back()">Retour</a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const article = ref(null);
const loading = ref(true);

async function fetchArticle() {
    loading.value = true;
    try {
        const res = await fetch(`http://localhost:3000/articles/${route.params.id}`);
        const data = await res.json();
        article.value = data.data || null;
    } catch (e) {
        article.value = null;
    } finally {
        loading.value = false;
    }
}

function editArticle() {
    if (article.value && article.value.id) {
        router.push({ name: 'PageEditArticle', params: { id: article.value.id } });
    }
}

async function deleteArticle() {
    if (!article.value || !article.value.id) return;
    if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return;
    try {
        const res = await fetch(`http://localhost:3000/articles/${article.value.id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erreur lors de la suppression');
        router.push({ name: 'PageArticles' });
    } catch (e) {
        alert("Erreur lors de la suppression de l'article.");
    }
}

onMounted(() => {
    fetchArticle();
});
</script>
