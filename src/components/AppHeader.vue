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
      <!-- Hamburger menu button - only visible on small screens -->
      <button
        class="hamburger-btn"
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

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

    <!-- Mobile dropdown menu -->
    <nav class="mobile-nav" :class="{ open: isMenuOpen }">
      <RouterLink
        v-if="isAuthenticated"
        class="mobile-nav-link"
        to="/dashboard"
        @click="closeMenu"
      >Dashboard</RouterLink>
      <RouterLink
        class="mobile-nav-link"
        to="/docs"
        @click="closeMenu"
      >Docs</RouterLink>
      <RouterLink
        class="mobile-nav-link"
        to="/about"
        @click="closeMenu"
      >About</RouterLink>
      <a
        href="https://blog.nxthdr.dev"
        target="_blank"
        rel="noopener"
        class="mobile-nav-link"
        @click="closeMenu"
      >Blog</a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLogto } from '@logto/vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const { isAuthenticated, signIn, signOut } = useLogto();
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

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
