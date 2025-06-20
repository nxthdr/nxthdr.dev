<template>
  <div class="page-root">
    <AppHeader>
      <template #actions>
        <button
          class="login-btn"
          @click="handleLogout"
        >Logout</button>
      </template>
    </AppHeader>
    <div class="dashboard-root">
      <h1>Welcome to your Dashboard</h1>
      <p>This page is only accessible to authenticated users.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { useLogto } from '@logto/vue';

const { signOut } = useLogto();
function handleLogout() {
  signOut(window.location.origin + '/');
}
</script>
