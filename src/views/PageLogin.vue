<template>
	<div class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light"
		data-uk-height-viewport>
		<div class="uk-position-cover uk-overlay-primary"></div>
		<div class="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index">
			<span class="uk-text-small uk-text-muted">© 2019 Company Name - <a
					href="https://github.com/zzseba78/Kick-Off">Created by KickOff</a> | Built with <a
					href="http://getuikit.com" title="Visit UIkit 3 site" target="_blank" data-uk-tooltip><span
						data-uk-icon="uikit"></span></a></span>
		</div>
		<div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">

			<div class="uk-text-center uk-margin">
				<img src="../../assets/img/login-logo.svg" alt="Logo">
			</div>

			<form @submit.prevent="onLogin">
				<fieldset class="uk-fieldset">
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
							<input class="uk-input uk-border-pill" required placeholder="Username" type="text"
								v-model="username">
						</div>
					</div>
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
							<input class="uk-input uk-border-pill" required placeholder="Password" type="password"
								v-model="password">
						</div>
					</div>
					<div class="uk-margin-bottom">
						<button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">LOG
							IN</button>
					</div>
				</fieldset>
			</form>
			<div class="uk-text-center">
				<a class="uk-link-reset uk-text-small" @click="goToInscription">Sign In</a>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const username = ref('')
		const password = ref('')
		const router = useRouter()

		const showModal = (message) => {
			if (window.UIkit && window.UIkit.modal) {
				window.UIkit.modal.dialog(`<div class='uk-modal-body'>${message}</div>`)
			} else {
				alert(message)
			}
		}

		const onLogin = async () => {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: username.value, password: password.value })
			})
			let json
			try {
				json = await response.json()
			} catch (e) {
				showModal('Erreur de connexion au serveur')
				return
			}
			if (json.code === "200") {
				// stocker l'email du user pour l'utiliser comme author
				try { localStorage.setItem('userEmail', username.value) } catch (e) { /* ignore */ }
				router.push({ name: 'PageArticles' })
			} else {
				showModal(json.message || 'Identifiants invalides')
			}
		}
		const goToInscription = () => {
			router.push({ name: 'PageInscription' })
		}
		return { username, password, onLogin, goToInscription }
	}
}
</script>