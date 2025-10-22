<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <div class="footer-branding">
          <div class="footer-logo">
            <img src="/favicon.svg" alt="nxthdr Logo" class="footer-logo-img" />
            <span class="footer-brand">nxthdr</span>
          </div>
          <!-- GitHub icon appears here on mobile -->
          <div class="footer-social footer-social-mobile">
            <a href="https://github.com/nxthdr" target="_blank" rel="noopener" aria-label="GitHub" class="footer-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://discord.gg/KRsVs7jafg" target="_blank" rel="noopener" aria-label="Discord" class="footer-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
              </svg>
            </a>
          </div>
        </div>
        <p class="footer-tagline">A Wide-Open Window to the Internet</p>
      </div>

      <div class="footer-center">
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
            <a href="https://discord.gg/KRsVs7jafg" target="_blank" rel="noopener" class="footer-link">Discord</a>
            <a href="mailto:admin@nxthdr.dev" class="footer-link">Email</a>
          </div>
        </div>
      </div>

      <div class="footer-right">
        <div class="footer-social footer-social-desktop">
          <a href="https://github.com/nxthdr" target="_blank" rel="noopener" aria-label="GitHub" class="footer-social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://discord.gg/nxthdr" target="_blank" rel="noopener" aria-label="Discord" class="footer-social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="copyright">&copy; {{ currentYear }} nxthdr. Licensed under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT License</a>.</p>
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
  z-index: 5;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2.5rem;
  box-sizing: border-box;
}

.footer-left {
  flex: 1;
  margin-bottom: 2rem;
  min-width: 200px;
}

.footer-branding {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.footer-logo {
  display: flex;
  align-items: center;
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
  width: 100%;
  gap: 2rem; /* Add gap between sections */
}

.footer-section {
  margin-bottom: 1.5rem;
  min-width: 150px;
  margin-right: 0; /* Remove right margin since we're using gap */
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
  align-items: flex-start;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

/* Hide mobile social on desktop */
.footer-social-mobile {
  display: none;
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
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

.copyright {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin: 0;
}

@media (max-width: 1200px) {
  .footer-content {
    flex-direction: column !important;
    padding: 0 1rem;
  }

  .footer-center {
    width: 100% !important;
    margin-bottom: 1rem;
  }

  .footer-links {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    gap: 1rem;
    width: 100%;
  }

  .footer-section {
    margin-right: 0 !important;
    flex: 1 !important;
    min-width: 140px !important;
    margin-bottom: 0;
  }

  .footer-right {
    justify-content: flex-start !important;
    margin-top: 1rem;
  }
}

/* Switch to vertical layout when horizontal becomes too cramped */
@media (max-width: 768px) {
  .footer-links {
    flex-direction: column !important;
    gap: 1.5rem;
    justify-content: flex-start !important;
  }

  .footer-section {
    width: 100% !important;
    min-width: unset !important;
    flex: none !important;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 1.5rem 0 1rem;
  }

  .footer-content {
    flex-direction: column !important;
    padding: 0 1rem;
  }

  /* Show mobile social, hide desktop social */
  .footer-social-mobile {
    display: flex !important;
  }

  .footer-social-desktop {
    display: none !important;
  }

  .footer-left {
    margin-bottom: 1.5rem;
  }

  .footer-branding {
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .footer-tagline {
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .footer-center {
    width: 100% !important;
    margin-bottom: 1rem;
  }

  .footer-links {
    flex-direction: column !important;
    gap: 1.5rem;
    justify-content: flex-start !important;
  }

  .footer-section {
    margin-right: 0 !important;
    margin-bottom: 0;
    width: 100% !important;
    min-width: unset !important;
    flex: none !important;
  }

  .footer-section-title {
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
  }

  .footer-link {
    padding-left: 0;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .footer-right {
    display: none !important; /* Hide since social icons are now in footer-left */
  }

  .footer-bottom {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
  }

  .copyright {
    font-size: 0.8rem;
    line-height: 1.4;
  }
}

/* Additional mobile optimization for very small screens */
@media (max-width: 480px) {
  .footer-content {
    padding: 0 0.75rem;
  }

  .footer-left {
    margin-bottom: 1.25rem;
  }

  .footer-section {
    margin-bottom: 1.25rem;
  }

  .footer-section-title {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .footer-link {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }

  .footer-bottom {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .copyright {
    font-size: 0.75rem;
  }
}
</style>
