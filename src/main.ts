import './assets/main.css'

document.documentElement.classList.add('dark');

import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from './router'

// Check if required environment variables are set
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

if (!domain || !clientId) {
  console.error('Error: Required Auth0 environment variables are not set.');
  document.body.innerHTML = '<div style="color: red; padding: 20px; text-align: center; font-family: sans-serif;"><h1>Configuration Error</h1><p>Authentication configuration is missing. Please set the required environment variables VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID.</p></div>';
  throw new Error('Required Auth0 environment variables are not set');
}

// Validate domain format
if (!domain.includes('.auth0.com') && !domain.includes('.us.auth0.com') && !domain.includes('.eu.auth0.com') && !domain.includes('.au.auth0.com')) {
  console.warn('Auth0 domain format might be incorrect. Expected format: your-domain.auth0.com')
}

const app = createApp(App)

const auth0Config: any = {
  domain: domain,
  clientId: clientId,
  authorizationParams: {
    redirect_uri: window.location.origin + '/callback'
  },
  cacheLocation: 'localstorage'
}

// Only add audience if it's configured
if (audience) {
  auth0Config.authorizationParams.audience = audience
}

app.use(createAuth0(auth0Config))

app.use(router)
app.mount('#app')

