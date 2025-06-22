<template>
  <header class="header">
    <div class="header-left">
      <img class="header-logo" src="/favicon.svg" alt="nxthdr logo" />
      <a class="header-brand" href="/">nxthdr</a>
      <nav class="header-nav">
        <a
          v-if="isAuthenticated"
          class="header-link"
          href="/dashboard"
        >Dashboard</a>
        <a class="header-link" href="/docs">Docs</a>
        <a class="header-link" href="/about">About</a>
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
const { isAuthenticated, signIn, signOut } = useLogto();
function handleLogin() {
  signIn(window.location.origin + '/callback');
}
function handleLogout() {
  signOut(window.location.origin + '/');
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.5rem 1.2rem 2.5rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(66,205,158,0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.header-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
.header-brand {
  font-size: 1.3rem;
  font-weight: 800;
  color: #42cd9e;
  letter-spacing: 0.5px;
}
.header-nav {
  display: flex;
  align-items: center;
  gap: 2.2rem;
  margin-left: 2.5rem;
}
.header-link {
  color: #3C474B;
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s;
}
.header-link:hover {
  color: #42cd9e;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 1.1rem;
}
.login-btn, .register-btn {
  padding: 0.6rem 1.3rem;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.login-btn {
  background: #f7fafd;
  color: #42cd9e;
  border: 1.5px solid #42cd9e;
}
.login-btn:hover {
  background: #e6f9f2;
}
.register-btn {
  background: #42cd9e;
  color: #fff;
  margin-left: 0.2rem;
}
.register-btn:hover {
  filter: brightness(1.08);
}
</style>
