<template>
  <div class="page-root docs-page-root">
    <AppHeader />
    <main class="main-content docs-layout">
      <Sidebar
        :initial-sidebar-state="isSidebarOpen"
        :sections="sidebarSections"
        @update:is-sidebar-open="updateSidebarState"
      />

      <div class="docs-content">
        <router-view v-if="$route.path !== '/docs'" />
        <div v-else class="docs-landing docs-page-content">
          <h1 class="docs-title">Documentation</h1>
          <div class="main-subtitle">Find guides and references for using the platform.</div>

          <div class="section-container">
            <div class="quick-links">
              <router-link to="/docs/measurements" class="quick-link">
                <span class="quick-link-title">Measurements</span>
                <span class="quick-link-desc">Internet measurements platform</span>
              </router-link>

              <router-link to="/docs/datasets" class="quick-link">
                <span class="quick-link-title">Datasets</span>
                <span class="quick-link-desc">Available datasets</span>
              </router-link>

              <router-link to="/docs/infrastructure" class="quick-link">
                <span class="quick-link-title">Infrastructure</span>
                <span class="quick-link-desc">Platform architecture & networks</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import Sidebar from '@/components/Sidebar.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const isSidebarOpen = ref(false);

// Define the sidebar sections
const sidebarSections = [
  {
    title: 'MEASUREMENTS',
    links: [
      { to: '/docs/measurements', text: 'Overview' }
    ]
  },
  {
    title: 'DATASETS',
    links: [
      { to: '/docs/datasets', text: 'Overview' }
    ]
  },
  {
    title: 'INFRASTRUCTURE',
    links: [
      { to: '/docs/infrastructure', text: 'Overview' },
      { to: '/docs/as215011', text: 'as215011' }
    ]
  }
];

function updateSidebarState(isOpen: boolean) {
  isSidebarOpen.value = isOpen;
}
</script>

<style scoped>
/* Additional style for docs page-root */
:deep(.docs-page-root) {
  display: flex;
  flex-direction: column;
}

.docs-layout {
  display: flex;
  gap: 0;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - var(--header-height) - var(--footer-height)); /* Adjust for header and footer */
}

.docs-content {
  flex: 1;
  padding-left: 300px; /* Account for sidebar width */
  padding-right: 1.5rem;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - var(--header-height) - var(--footer-height)); /* Adjust for header and footer */
  padding-top: 2rem; /* Increased top padding for better spacing with titles */
  padding-bottom: 2rem; /* Add bottom padding to ensure content doesn't touch footer */
  transition: padding 0.3s ease; /* Smooth transition for responsive changes */
}

/* Quick links have been moved to DocsContentStyle component */

/* Responsive adjustments */
@media (max-width: 992px) {
  .docs-content {
    padding-left: 260px; /* Account for narrower sidebar on medium screens */
  }
}

@media (max-width: 768px) {
  .docs-layout {
    flex-direction: column;
  }

  .docs-content {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    min-height: auto; /* Remove min-height constraint on mobile */
  }

  /* Better spacing for docs landing page content on mobile */
  .docs-landing {
    padding: 0 0.5rem;
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .docs-landing .docs-title {
    font-size: 2rem !important;
    margin-bottom: 0.5rem;
  }

  .docs-landing .main-subtitle {
    font-size: 1rem !important;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }

  .section-container {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .docs-content {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 1rem;
  }

  .docs-landing {
    padding: 0 0.25rem;
  }

  .docs-landing .docs-title {
    font-size: 1.8rem !important;
  }

  .docs-landing .main-subtitle {
    font-size: 0.95rem !important;
  }
}
</style>

