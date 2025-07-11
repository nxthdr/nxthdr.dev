import './assets/main.css'

document.documentElement.classList.add('dark');

import { createApp } from 'vue'
import { createLogto } from '@logto/vue';

import App from './App.vue'
import router from './router'

// Check if required environment variables are set
if (!import.meta.env.VITE_LOGTO_APP_ID || !import.meta.env.VITE_LOGTO_ENDPOINT) {
  console.error('Error: Required Logto environment variables are not set.');
  document.body.innerHTML = '<div style="color: red; padding: 20px; text-align: center; font-family: sans-serif;"><h1>Configuration Error</h1><p>Authentication configuration is missing. Please set the required environment variables VITE_LOGTO_APP_ID and VITE_LOGTO_ENDPOINT.</p></div>';
  throw new Error('Required Logto environment variables are not set');
}

// Check if resource URL is set
if (!import.meta.env.VITE_LOGTO_RESOURCE_URL) {
  console.error('Error: Logto resource URL environment variable is not set.');
}

const config = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APP_ID,
  resources: [import.meta.env.VITE_LOGTO_RESOURCE_URL ],
};

createApp(App)
    .use(router)
    .use(createLogto, config)
    .mount('#app')

