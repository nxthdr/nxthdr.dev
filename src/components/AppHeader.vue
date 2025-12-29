<template>
  <header class="header">
    <div class="header-left">
      <RouterLink class="header-brand" to="/">nxthdr</RouterLink>
      <nav class="header-nav">
        <RouterLink
          v-if="isAuthenticated"
          class="header-link"
          to="/peering"
        >Peering</RouterLink>
        <RouterLink
          v-if="isAuthenticated"
          class="header-link"
          to="/probing"
        >Probing</RouterLink>
        <a href="https://docs.nxthdr.dev/docs" target="_blank" rel="noopener" class="header-link">Docs</a>
        <a href="https://blog.nxthdr.dev" target="_blank" rel="noopener" class="header-link">Blog</a>
        <RouterLink class="header-link" to="/about">About</RouterLink>
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
        to="/peering"
        @click="closeMenu"
      >Peering</RouterLink>
      <RouterLink
        v-if="isAuthenticated"
        class="mobile-nav-link"
        to="/probing"
        @click="closeMenu"
      >Probing</RouterLink>
      <RouterLink
        class="mobile-nav-link"
        to="/docs/measurements"
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
import { useAuth0 } from '@auth0/auth0-vue';
import { RouterLink } from 'vue-router';

const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
const isMenuOpen = ref(false);
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function handleLogin() {
  // Include audience in login if configured
  const loginOptions: any = {};
  if (audience) {
    loginOptions.authorizationParams = {
      audience: audience
    };
  }
  loginWithRedirect(loginOptions);
}

function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
}
</script>
