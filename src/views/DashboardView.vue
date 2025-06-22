<template>
  <div class="page-root">
    <AppHeader />
    <main class="dashboard-root">
      <div class="content-wrapper">
        <div class="content-card">
          <h1>Dashboard</h1>
          <p>This page is only accessible to authenticated users.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>

