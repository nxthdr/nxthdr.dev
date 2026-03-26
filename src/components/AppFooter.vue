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
            <a href="https://chat.nxthdr.dev" target="_blank" rel="noopener" aria-label="Chat" class="footer-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </a>
          </div>
        </div>
        <p class="footer-tagline">Open Infrastructure for Internet Experimentation</p>
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
            <a href="https://chat.nxthdr.dev" target="_blank" rel="noopener" class="footer-link">Chat</a>
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
          <a href="https://chat.nxthdr.dev" target="_blank" rel="noopener" aria-label="Chat" class="footer-social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="copyright">&copy; {{ currentYear }} nxthdr. Licensed under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT License</a>.</p>
      <div class="footer-legal-links">
        <a href="https://docs.nxthdr.dev/docs/reference/terms/" target="_blank" rel="noopener" class="footer-legal-link">Terms of Service</a>
        <span class="footer-legal-separator">•</span>
        <a href="https://docs.nxthdr.dev/docs/reference/privacy/" target="_blank" rel="noopener" class="footer-legal-link">Privacy</a>
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

.copyright a {
  color: var(--color-text-muted);
  text-decoration: underline;
  transition: color 0.2s;
}

.copyright a:hover {
  color: var(--color-accent);
}

.footer-legal-links {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.footer-legal-link {
  color: var(--color-text-muted);
  text-decoration: underline;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-legal-link:hover {
  color: var(--color-accent);
}

.footer-legal-separator {
  color: var(--color-text-muted);
  font-size: 0.85rem;
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
