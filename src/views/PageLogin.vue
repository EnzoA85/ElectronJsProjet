<template>
	<div class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>
		<!-- overlay -->
		<div class="uk-position-cover uk-overlay-primary"></div>
		<!-- /overlay -->
		<div class="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index">
			<span class="uk-text-small uk-text-muted">© 2019 Company Name - <a href="https://github.com/zzseba78/Kick-Off">Created by KickOff</a> | Built with <a href="http://getuikit.com" title="Visit UIkit 3 site" target="_blank" data-uk-tooltip><span data-uk-icon="uikit"></span></a></span>
		</div>
		<div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
			
			<div class="uk-text-center uk-margin">
				<img src="../../assets/img/login-logo.svg" alt="Logo">
			</div>

			<form v-if="isLogin" @submit.prevent="onLogin">
				<fieldset class="uk-fieldset">
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
							<input class="uk-input uk-border-pill" required placeholder="Username" type="text" v-model="username">
						</div>
					</div>
					<div class="uk-margin-small">
						<div class="uk-inline uk-width-1-1">
							<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
							<input class="uk-input uk-border-pill" required placeholder="Password" type="password" v-model="password">
						</div>
					</div>
					<div class="uk-margin-small">
						<label><input class="uk-checkbox" type="checkbox"> Keep me logged in</label>
					</div>
					<div class="uk-margin-bottom">
						<button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">LOG IN</button>
					</div>
				</fieldset>
			</form>

			<form v-else @submit.prevent="onSignup">
				<div class="uk-margin-small">
					<fieldset class="uk-fieldset">
						<div class="uk-margin-small">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
								<input class="uk-input uk-border-pill" required placeholder="Pseudo" type="text" v-model="signupPseudo">
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
								<input class="uk-input uk-border-pill" required placeholder="Email" type="email" v-model="signupEmail">
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
								<input class="uk-input uk-border-pill" required placeholder="Code postal" type="text" v-model="signupCityCode">
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
								<input class="uk-input uk-border-pill" required placeholder="Ville" type="text" v-model="signupCity">
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: phone"></span>
								<input class="uk-input uk-border-pill" required placeholder="Téléphone" type="text" v-model="signupPhone">
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
								<input class="uk-input uk-border-pill" required placeholder="Password" type="password"
									v-model="signupPassword">
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-inline uk-width-1-1">
								<span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
								<input class="uk-input uk-border-pill" required placeholder="Confirm Password"
									type="password" v-model="signupConfirmPassword">
							</div>
						</div>
					</fieldset>
				</div>
				<div class="uk-margin-bottom">
					<button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">SIGN
						IN</button>
				</div>
			</form>

			<div>
				<div class="uk-text-center">
					<a v-if="isLogin" class="uk-link-reset uk-text-small" @click="isLogin = false">Sign In</a>
					<a v-else class="uk-link-reset uk-text-small" @click="isLogin = true"><span data-uk-icon="arrow-left"></span> Back to Login</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const isLogin = ref(true)
		const username = ref('')
		const password = ref('')
		const router = useRouter()

		// Pour l'inscription
		const signupEmail = ref('')
		const signupPassword = ref('')
		const signupConfirmPassword = ref('')

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
					alert('Erreur de connexion au serveur')
					return
				}
				if (json.code === "200") {
					router.push({ name: 'PageArticles' })
				} else {
					alert(json.message || 'Identifiants invalides')
				}
			}

		const onSignup = async () => {
			if (signupPassword.value !== signupConfirmPassword.value) {
				alert('Les mots de passe ne correspondent pas')
				return
			}
			const response = await fetch('http://localhost:3000/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: signupEmail.value, password: signupPassword.value, confirmPassword: signupConfirmPassword.value })
			})
			if (response.ok) {
				// On revient au formulaire de connexion uniquement si succès
				isLogin.value = true
				// Reset champs
				signupEmail.value = ''
				signupPassword.value = ''
				signupConfirmPassword.value = ''
				alert('Inscription réussie, veuillez vous connecter.')
			} else {
				const error = await response.text()
				alert('Erreur lors de l\'inscription : ' + error)
			}
		}

		return { isLogin, username, password, onLogin, signupEmail, signupPassword, signupConfirmPassword, onSignup }
	}
}
</script>