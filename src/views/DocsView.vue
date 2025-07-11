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
        <router-view />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import Sidebar from '@/components/Sidebar.vue';
import AppFooter from '@/components/AppFooter.vue';
import { ref } from 'vue';

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
}

@media (max-width: 480px) {
  .docs-content {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 1rem;
  }
}
</style>

