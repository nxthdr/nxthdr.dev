<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <h1>A Wide-Open Window to the Internet</h1>
      <p class="main-desc">
        <b>nxthdr</b>, pronounced /ˈnɛkst ˈhɛdə˞/ or simply “Next Header”, is an initiative to offer metrology capabilities to researchers and students to study and learn about the Internet.
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import './HomeView.css';
import AppHeader from '@/components/AppHeader.vue';
import { ref, onMounted } from 'vue';
import { useLogto, type IdTokenClaims } from '@logto/vue';

const { isAuthenticated, getIdTokenClaims } = useLogto();
const user = ref<IdTokenClaims>();

onMounted(async () => {
  if (isAuthenticated.value) {
    const claims = await getIdTokenClaims();
    user.value = claims;
  }
});
</script>
