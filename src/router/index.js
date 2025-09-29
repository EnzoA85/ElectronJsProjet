import { createRouter, createWebHashHistory } from 'vue-router';
import PageArticles from '../views/PageArticles.vue';
import PageLogin from '../views/PageLogin.vue';
import PageArticleDetail from '../views/PageArticleDetail.vue';
import PageEditArticle from '../views/PageEditArticle.vue';

const routes = [
    { path: '/', name: 'PageLogin', component: PageLogin },
    { path: '/articles', name: 'PageArticles', component: PageArticles },
    { path: '/article/:id', name: 'PageArticleDetail', component: PageArticleDetail },
    { path: '/article/:id/edit', name: 'PageEditArticle', component: PageEditArticle },
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;