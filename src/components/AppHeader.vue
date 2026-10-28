<template>
  <header class="header">
    <div class="header-inner">
      <RouterLink class="header-brand" to="/">
        <span class="brand-mark">
          <svg aria-hidden="true" width="18" height="15" viewBox="0 4.5 48 39" fill="currentColor"><path d="M29.707 35.793C29.669 35.756 29.622 35.739 29.58 35.709A6.96 6.96 0 0 0 31 31.5C31 27.641 27.859 24.5 24 24.5S17 27.641 17 31.5 20.14 38.5 24 38.5A6.95 6.95 0 0 0 28.208 37.08C28.238 37.121 28.255 37.17 28.292 37.207L34.292 43.207A0.996 0.996 0 0 0 35.706 43.207 0.997 0.997 0 0 0 35.706 41.793zM24 36.5C21.243 36.5 19 34.257 19 31.5S21.243 26.5 24 26.5 29 28.743 29 31.5 26.757 36.5 24 36.5M48 29.5C48 34.463 43.962 38.5 39 38.5H35.242L32.117 35.375A8.9 8.9 0 0 0 32.999 31.5C32.999 26.537 28.961 22.5 23.999 22.5S14.999 26.537 14.999 31.5A8.98 8.98 0 0 0 18.354 38.5H12C5.383 38.5 0 33.117 0 26.5 0 20.203 4.875 15.023 11.05 14.537 11.698 8.311 18.591 4.5 25 4.5 33.271 4.5 40 11.678 40 20.5V20.557C44.494 21.055 48 24.875 48 29.5"/></svg>
        </span>
        nxthdr
      </RouterLink>
      <nav class="header-nav" aria-label="Main">
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
      <div class="header-actions">
        <button
          v-if="isAuthenticated"
          class="login-btn"
          @click="handleLogout"
        >Log out</button>
        <button
          v-else
          class="login-btn"
          @click="handleLogin"
        >Log in</button>

        <!-- Hamburger menu button - only visible on small screens -->
        <button
          class="hamburger-btn"
          @click="toggleMenu"
          :class="{ active: isMenuOpen }"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
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
