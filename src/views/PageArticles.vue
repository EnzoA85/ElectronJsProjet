<template>
    <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
        <div class="uk-container uk-container-expand uk-margin-large-bottom">
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom">
                <h3 class="uk-heading-bullet uk-margin-remove">Liste des articles</h3>
                <div class="uk-inline">
                    <a class="uk-icon-button" data-uk-icon="icon:plus" @click="goToNewArticle"></a>
                </div>
            </div>
            <div class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-child-width-1-5@xl uk-grid-match js-filter"
                data-uk-grid="masonry: true" data-uk-sortable="handle: .drag-icon">
                <div v-for="article in articles" :key="article.title" class="uk-animation-fade">
                    <div class="uk-card uk-card-small uk-card-default">
                        <div class="uk-card-media" @click="openArticle(article)">
                            <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
                                <img class="lazy" :src="article.imgPath" data-uk-img alt="Image article"
                                    style="width:100%;height:200px;object-fit:cover;">
                            </div>
                        </div>
                        <div class="uk-card-body" @click="openArticle(article)">
                            <h6 class="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">{{ article.title }}
                            </h6>
                            <p class="uk-text-small uk-text-muted">{{ article.desc }}</p>
                        </div>
                        <div class="uk-card-footer">
                            <div class="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid>
                                <div class="uk-width-expand uk-text-small">
                                    {{ article.author }}
                                </div>
                                <div class="uk-width-auto uk-text-right">
                                    <a data-uk-tooltip="title: Twitter" class="uk-icon-link"
                                        data-uk-icon="icon:twitter; ratio: 0.8"></a>
                                    <a data-uk-tooltip="title: Instagram" class="uk-icon-link"
                                        data-uk-icon="icon:instagram; ratio: 0.8"></a>
                                </div>
                                <div class="uk-width-auto uk-text-right">
                                    <a data-uk-tooltip="title: Drag this card" href="#" class="uk-icon-link drag-icon"
                                        data-uk-icon="icon:move; ratio: 1"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([]);

async function fetchArticles() {
    const res = await fetch('http://localhost:3000/articles');
    const data = await res.json();
    articles.value = Array.isArray(data.data) ? data.data : [];
};

import { useRouter } from 'vue-router';
const router = useRouter();

function openArticle(article) {
    if (article && article.id) {
        router.push(`/article/${article.id}`);
    }
}

function goToNewArticle() {
    router.push({ name: 'PageNewArticle' });
}

onMounted(() => {
    fetchArticles();
});
</script>