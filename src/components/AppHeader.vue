<template>
  <header class="header">
    <div class="header-left">
      <RouterLink class="header-brand" to="/">nxthdr</RouterLink>
      <nav class="header-nav">
        <RouterLink
          v-if="isAuthenticated"
          class="header-link"
          to="/dashboard"
        >Dashboard</RouterLink>
        <RouterLink class="header-link" to="/docs">Docs</RouterLink>
        <RouterLink class="header-link" to="/about">About</RouterLink>
        <a href="https://blog.nxthdr.dev" target="_blank" rel="noopener" class="header-link">Blog</a>
      </nav>
    </div>
    <div class="header-actions">
      <button
        v-if="isAuthenticated"
        class="login-btn"
        @click="handleLogout"
      >Logout</button>
      <button
        v-else
        class="login-btn"
        @click="handleLogin"
      >Login</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useLogto } from '@logto/vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const { isAuthenticated, signIn, signOut } = useLogto();

function handleLogin() {
  // Store the current path in localStorage before redirecting
  signIn(window.location.origin + '/callback');
}

function handleLogout() {
  // Use Vue Router to navigate after logout
  signOut(window.location.origin + '/');
}
</script>

<!-- Styles are now handled by main.css with dark mode only -->
