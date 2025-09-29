<template>
  <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
    <div class="uk-container uk-container-small">
      <h2 class="uk-heading-bullet">Modifier l'article</h2>
      <form class="uk-form-stacked" @submit.prevent="submitForm">
        <div class="uk-margin">
          <label class="uk-form-label" for="title">Titre</label>
          <div class="uk-form-controls">
            <input class="uk-input" id="title" v-model="form.title" required />
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="desc">Description</label>
          <div class="uk-form-controls">
            <textarea class="uk-textarea" id="desc" v-model="form.desc" rows="4" required></textarea>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="imgPath">Image (URL)</label>
          <div class="uk-form-controls">
            <input class="uk-input" id="imgPath" v-model="form.imgPath" required />
          </div>
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-primary" type="submit" :disabled="loading">Enregistrer</button>
          <button class="uk-button uk-button-default uk-margin-left" type="button" @click="$router.back()">Annuler</button>
        </div>
        <div v-if="error" class="uk-alert-danger uk-margin" uk-alert>{{ error }}</div>
        <div v-if="success" class="uk-alert-success uk-margin" uk-alert>Article modifié avec succès !</div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const form = ref({ title: '', desc: '', imgPath: '', author: '' });
const loading = ref(false);
const error = ref('');
const success = ref(false);

async function fetchArticle() {
  try {
    const res = await fetch(`http://localhost:3000/articles/${route.params.id}`);
    const data = await res.json();
    if (data.data) {
      form.value = {
        title: data.data.title || '',
        desc: data.data.desc || '',
        imgPath: data.data.imgPath || '',
        author: data.data.author || ''
      };
    }
  } catch (e) {
    error.value = "Impossible de charger l'article.";
  }
}

async function submitForm() {
  loading.value = true;
  error.value = '';
  success.value = false;
  try {
    const res = await fetch('http://localhost:3000/articles/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: route.params.id,
        title: form.value.title,
        desc: form.value.desc,
        imgPath: form.value.imgPath,
        author: form.value.author
      })
    });
    if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
    success.value = true;
    setTimeout(() => router.push({ name: 'PageArticleDetail', params: { id: route.params.id } }), 1000);
  } catch (e) {
    error.value = "Erreur lors de la sauvegarde.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchArticle();
});
</script>