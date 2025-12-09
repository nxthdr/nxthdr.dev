<script setup lang="ts">
import { useHandleSignInCallback } from '@logto/vue';
import router from '@/router';

const { isLoading } = useHandleSignInCallback(() => {
    router.push('/probing');
});
</script>

<template>
  <!-- When it's working in progress -->
  <p v-if="isLoading">Redirecting...</p>
</template>
