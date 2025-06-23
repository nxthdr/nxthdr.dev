<template>
  <div class="page-root docs-page-root">
    <AppHeader />
    <main class="main-content docs-layout">
      <DocsSidebar
        :initial-sidebar-state="isSidebarOpen"
        :sections="sidebarSections"
        @update:is-sidebar-open="updateSidebarState"
      />

      <div class="docs-content">
        <router-view v-if="$route.path !== '/docs'" />
        <div v-else class="docs-landing docs-page-content">
          <h1 class="docs-title">Documentation</h1>
          <p class="docs-subtitle">Here you'll find guides and references for using the platform.</p>

          <div class="section-container">
            <p>Please select a topic from the sidebar to get started:</p>

            <div class="quick-links">
              <router-link to="/docs/infrastructure" class="quick-link">
                <span class="quick-link-title">Infrastructure</span>
                <span class="quick-link-desc">Platform architecture & AS215011 network</span>
              </router-link>

              <router-link to="/docs/datasets" class="quick-link">
                <span class="quick-link-title">Datasets</span>
                <span class="quick-link-desc">Available data & access methods</span>
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
import DocsSidebar from '@/components/DocsSidebar.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const isSidebarOpen = ref(false);

// Define the sidebar sections
const sidebarSections = [
  {
    title: 'INFRASTRUCTURE',
    links: [
      { to: '/docs/infrastructure', text: 'Overview' },
      { to: '/docs/as215011', text: 'AS215011 Network' }
    ]
  },
  {
    title: 'DATASETS',
    links: [
      { to: '/docs/datasets', text: 'Available Data' }
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
}

/* Quick links have been moved to DocsContentStyle component */

/* Ensure docs title has no shadow and proper alignment */
:deep(.docs-title) {
  text-shadow: none !important;
  filter: none !important;
  margin-bottom: 0 !important;
}

:deep(.docs-subtitle) {
  margin-top: 0 !important;
}

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
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    min-height: auto; /* Remove min-height constraint on mobile */
  }
}
</style>

