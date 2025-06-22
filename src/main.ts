import './assets/main.css'

document.documentElement.classList.add('dark');

import { createApp } from 'vue'
import { createLogto } from '@logto/vue';

import App from './App.vue'
import router from './router'

const config = {
  endpoint: 'https://3qo5br.logto.app/',
  appId: 'y2obn9hlxnhxqpw8briyf',
};

createApp(App)
    .use(router)
    .use(createLogto, config)
    .mount('#app')

