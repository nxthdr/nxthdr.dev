<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

const { isLoading, isAuthenticated } = useAuth0();
const router = useRouter();

onMounted(async () => {
  // Wait for Auth0 to finish processing the callback
  while (isLoading.value) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // After loading completes, redirect to home
  router.push('/');
});
</script>

<template>
  <div class="callback-container">
    <p v-if="isLoading">Redirecting...</p>
    <p v-else>Processing authentication...</p>
  </div>
</template>

<style scoped>
.callback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: var(--color-text);
}
</style>
