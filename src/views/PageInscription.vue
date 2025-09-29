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

			<form @submit.prevent="onSignup">
				<fieldset class="uk-fieldset">
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
							<input class="uk-input uk-border-pill" required placeholder="Email" type="email" v-model="email">
						</div>
					</div>
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
							<input class="uk-input uk-border-pill" required placeholder="Mot de passe" type="password" v-model="password">
						</div>
					</div>
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
							<input class="uk-input uk-border-pill" required placeholder="Confirmation du mot de passe" type="password" v-model="passwordConfirm">
						</div>
					</div>
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
							<input class="uk-input uk-border-pill" required placeholder="Pseudo" type="text" v-model="pseudo">
						</div>
					</div>
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
							<input class="uk-input uk-border-pill" required placeholder="Code postal" type="text" v-model="cityCode">
						</div>
					</div>
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
							<input class="uk-input uk-border-pill" required placeholder="Ville" type="text" v-model="city">
						</div>
					</div>
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: phone"></span>
							<input class="uk-input uk-border-pill" required placeholder="Téléphone" type="text" v-model="phone">
						</div>
					</div>
					<div class="uk-margin-bottom">
						<button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">SIGN IN</button>
					</div>
				</fieldset>
			</form>
			<div class="uk-text-center">
				<a class="uk-link-reset uk-text-small" @click="goToLogin">Log In</a>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
	setup() {
		const router = useRouter()
		const email = ref('')
		const password = ref('')
		const passwordConfirm = ref('')
		const pseudo = ref('')
		const cityCode = ref('')
		const city = ref('')
		const phone = ref('')

		const goToLogin = () => {
			router.push({ name: 'PageLogin' })
		}

		// Affiche un modal UIkit avec le message passé
		const showModal = (message) => {
			if (window.UIkit && window.UIkit.modal) {
				window.UIkit.modal.dialog(`<div class='uk-modal-body'>${message}</div>`)
			} else {
				alert(message)
			}
		}

		const onSignup = async () => {
			if (password.value !== passwordConfirm.value) {
				showModal('Les mots de passe ne correspondent pas')
				return
			}
			const response = await fetch('http://localhost:3000/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email.value,
					password: password.value,
					passwordConfirm: passwordConfirm.value,
					pseudo: pseudo.value,
					cityCode: cityCode.value,
					city: city.value,
					phone: phone.value
				})
			})
			let json
			try {
				json = await response.json()
			} catch (e) {
				showModal('Erreur lors de l\'inscription : réponse invalide')
				return
			}
			if (json.code === "200") {
				if (window.UIkit && window.UIkit.modal) {
					const modal = window.UIkit.modal.dialog(`<div class='uk-modal-body'>${json.message || 'Inscription réussie, veuillez vous connecter.'}</div>`)
					modal.$el.addEventListener('hidden', () => {
						goToLogin()
					}, { once: true })
				} else {
					alert(json.message || 'Inscription réussie, veuillez vous connecter.')
					goToLogin()
				}
			} else {
				showModal(json.message || 'Erreur lors de l\'inscription')
			}
		}

		return { email, password, passwordConfirm, pseudo, cityCode, city, phone, goToLogin, onSignup }
	}
}
</script>