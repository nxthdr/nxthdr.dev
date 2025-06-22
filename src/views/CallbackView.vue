<script setup lang="ts">
import { useHandleSignInCallback } from '@logto/vue';
import router from '@/router';

const { isLoading } = useHandleSignInCallback(() => {
    // Retrieve stored redirect path or default to dashboard
    const redirectPath = localStorage.getItem('nxthdr-redirect-after-login') || '/dashboard';
    // Clear the stored path
    localStorage.removeItem('nxthdr-redirect-after-login');
    // Navigate to the redirect path
    router.push(redirectPath);
});
</script>

<template>
  <!-- When it's working in progress -->
  <p v-if="isLoading">Redirecting...</p>
</template>
