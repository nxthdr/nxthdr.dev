<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <div class="footer-logo">
          <img src="/favicon.svg" alt="nxthdr Logo" class="footer-logo-img" />
          <span class="footer-brand">nxthdr</span>
        </div>
        <p class="footer-tagline">Powering network measurements and research</p>
      </div>

      <div class="footer-center">
        <div class="footer-links">
          <div class="footer-section">
            <h3 class="footer-section-title">Platform</h3>
            <router-link to="/docs/infrastructure" class="footer-link">Infrastructure</router-link>
            <router-link to="/docs/datasets" class="footer-link">Datasets</router-link>
            <router-link to="/docs/as215011" class="footer-link">AS215011</router-link>
          </div>

          <div class="footer-section">
            <h3 class="footer-section-title">Resources</h3>
            <router-link to="/blog" class="footer-link">Blog</router-link>
            <a href="https://github.com/nxthdr" target="_blank" rel="noopener" class="footer-link">GitHub</a>
            <router-link to="/about" class="footer-link">About</router-link>
          </div>
        </div>
      </div>

      <div class="footer-right">
        <div class="footer-social">
          <a href="https://github.com/nxthdr" target="_blank" rel="noopener" aria-label="GitHub" class="footer-social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="copyright">&copy; {{ currentYear }} nxthdr. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: var(--color-header-bg);
  color: var(--color-text);
  padding: 2.5rem 0 1rem;
  margin-top: 0; /* Remove top margin to connect directly with content */
  border-top: 1px solid var(--color-border);
  min-height: var(--footer-height); /* Match footer height variable */
  box-sizing: border-box; /* Include padding in the height calculation */
  position: relative; /* Ensure proper stacking context */
  z-index: 5; /* Higher than sidebar to ensure it's always on top */
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.footer-left {
  flex: 1;
  margin-bottom: 2rem;
  min-width: 200px;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.footer-logo-img {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
}

.footer-brand {
  font-size: 1.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
}

.footer-tagline {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-top: 0;
}

.footer-center {
  flex: 2;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.footer-section {
  margin-bottom: 1.5rem;
  min-width: 150px;
  margin-right: 2rem;
}

.footer-section-title {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-link {
  display: block;
  color: var(--color-text);
  text-decoration: none;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
  transition: all 0.15s;
  font-weight: normal;
}

.footer-link:hover {
  color: var(--color-accent);
}

.footer-right {
  flex: 1;
  min-width: 200px;
  display: flex;
  justify-content: flex-end;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.footer-social-link {
  color: var(--color-text-muted);
  transition: color 0.2s;
}

.footer-social-link:hover {
  color: var(--color-accent);
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    padding: 0 1.5rem;
  }

  .footer-left, .footer-center, .footer-right {
    flex: 1 0 100%;
    margin-bottom: 2rem;
  }

  .footer-right {
    justify-content: flex-start;
  }
}
</style>
