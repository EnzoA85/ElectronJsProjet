<template>
    <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
        <div class="uk-container uk-container-small">
            <h2 class="uk-heading-bullet">Créer un article</h2>
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
                    <button class="uk-button uk-button-default uk-margin-left" type="button"
                        @click="$router.back()">Annuler</button>
                </div>
                <div v-if="error" class="uk-alert-danger uk-margin" uk-alert>{{ error }}</div>
                <div v-if="success" class="uk-alert-success uk-margin" uk-alert>Article créé avec succès !</div>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({ id: '', title: '', desc: '', imgPath: '', author: '' })
const loading = ref(false)
const error = ref('')
const success = ref(false)

async function init() {
    const userEmail = localStorage.getItem('userEmail') || ''
    form.value.author = userEmail

    try {
        const res = await fetch('http://localhost:3000/articles')
        const json = await res.json()
        if (json && Array.isArray(json.data)) {
            const maxId = json.data.reduce((max, item) => {
                const n = parseInt(item.id, 10)
                return !isNaN(n) ? Math.max(max, n) : max
            }, 0)
            form.value.id = String(maxId + 1)
        } else {
            form.value.id = '1'
        }
    } catch (e) {
        form.value.id = '1'
    }
}

async function submitForm() {
    loading.value = true
    error.value = ''
    success.value = false
    try {
        const res = await fetch('http://localhost:3000/articles/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: form.value.id,
                title: form.value.title,
                desc: form.value.desc,
                imgPath: form.value.imgPath,
                author: form.value.author
            })
        })
        if (!res.ok) throw new Error('Erreur lors de la sauvegarde')
        success.value = true
        setTimeout(() => router.push({ name: 'PageArticles' }), 900)
    } catch (e) {
        error.value = 'Erreur lors de la sauvegarde.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    init()
})
</script>
