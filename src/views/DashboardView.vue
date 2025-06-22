<template>
  <div class="page-root">
    <AppHeader />
    <div class="dashboard-root">
      <h1>Welcome to your Dashboard</h1>
      <p>This page is only accessible to authenticated users.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
// No login/logout logic needed, handled by AppHeader
</script>
