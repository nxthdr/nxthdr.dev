<script setup lang="ts">
import { watch } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

const { isLoading, isAuthenticated } = useAuth0();
const router = useRouter();

// Auth0 SDK automatically handles the callback redirect
// We just need to watch for when authentication completes and redirect
watch(isAuthenticated, (authenticated) => {
  if (authenticated) {
    // Redirect to probing page after successful authentication
    router.push('/probing');
  }
});

// Also handle the case where user is already authenticated when landing here
watch(isLoading, (loading) => {
  if (!loading && isAuthenticated.value) {
    router.push('/probing');
  } else if (!loading && !isAuthenticated.value) {
    // If not loading and not authenticated, something went wrong
    router.push('/');
  }
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
