<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-branding">
          <span class="footer-brand">nxthdr</span>
          <p class="footer-tagline">Open infrastructure for Internet experimentation.</p>
        </div>

        <div class="footer-links">
          <div class="footer-section">
            <h3 class="footer-section-title">Platform</h3>
            <router-link to="/docs/measurements" class="footer-link">Measurements</router-link>
            <router-link to="/docs/datasets" class="footer-link">Datasets</router-link>
          </div>

          <div class="footer-section">
            <h3 class="footer-section-title">Resources</h3>
            <a href="https://docs.nxthdr.dev/docs" target="_blank" rel="noopener" class="footer-link">Docs</a>
            <a href="https://blog.nxthdr.dev" target="_blank" rel="noopener" class="footer-link">Blog</a>
            <a href="https://github.com/nxthdr" target="_blank" rel="noopener" class="footer-link">GitHub</a>
          </div>

          <div class="footer-section">
            <h3 class="footer-section-title">Contact</h3>
            <a href="https://chat.nxthdr.dev" target="_blank" rel="noopener" class="footer-link">Chat</a>
            <a href="mailto:admin@nxthdr.dev" class="footer-link">Email</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} nxthdr · Licensed under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT License</a></p>
        <div class="footer-legal-links">
          <a href="https://docs.nxthdr.dev/docs/reference/terms/" target="_blank" rel="noopener">Terms of Service</a>
          <a href="https://docs.nxthdr.dev/docs/reference/privacy/" target="_blank" rel="noopener">Privacy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
}

.footer-inner {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 3rem 24px 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.footer-branding {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
}

.footer-brand {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-heading);
}

.footer-tagline {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.footer-section-title {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text-muted);
}

.footer-link {
  color: var(--color-text);
  font-weight: 400;
  text-decoration: none;
}

.footer-link:hover {
  color: var(--color-accent-ink);
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding-top: 1.25rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.copyright {
  margin: 0;
  font-size: inherit;
  color: inherit;
}

.footer-bottom a {
  color: var(--color-text-muted);
  font-weight: 400;
}

.footer-bottom a:hover {
  color: var(--color-text);
}

.footer-legal-links {
  display: flex;
  gap: 1.25rem;
}

@media (max-width: 640px) {
  .footer-links {
    gap: 2.5rem;
  }
}
</style>
