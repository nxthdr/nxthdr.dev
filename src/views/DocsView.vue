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

/* Override main-content behavior for docs pages */
:deep(.docs-page-root .main-content) {
  flex-direction: row; /* Change from column to row for sidebar layout */
  padding-left: 0; /* Remove default padding */
  padding-right: 0; /* Remove default padding */
}

.docs-layout {
  display: flex;
  flex-direction: row; /* Explicitly set to row for sidebar + content layout */
  gap: 0;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - var(--header-height) - var(--footer-height)); /* Adjust for header and footer */
  align-items: stretch; /* Make sidebar and content same height */
}

.docs-content {
  flex: 1;
  width: 100%;
  min-width: 0; /* Allow content to shrink below its natural width */
  max-width: none; /* Remove max-width constraint on docs content */
  min-height: calc(100vh - var(--header-height) - var(--footer-height)); /* Adjust for header and footer */
  padding: 2rem 2.5rem; /* Same padding as main-content */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  transition: padding 0.3s ease; /* Smooth transition for responsive changes */
  overflow-x: hidden; /* Prevent horizontal overflow */
}

.docs-content > * {
  width: 100%;
  max-width: min(900px, 100%); /* Responsive max-width that doesn't exceed container */
  margin: 0 auto; /* Center the content */
}

/* Quick links have been moved to DocsContentStyle component */

/* Responsive adjustments */
/* Desktop - sidebar is visible and pushes content */
@media (min-width: 1025px) {
  .docs-layout {
    display: flex; /* Sidebar and content side by side */
  }
  
  .docs-content {
    padding-left: 2rem; /* Reduced from 2.5rem to give more content space */
    padding-right: 2rem;
  }
}

/* Transition breakpoint - gradually reduce content padding */
@media (max-width: 1200px) and (min-width: 1025px) {
  .docs-content {
    padding-left: 1.5rem; /* Further reduced for tighter spaces */
    padding-right: 1.5rem;
  }
}

/* Intermediate breakpoint for very tight spaces */
@media (max-width: 1100px) and (min-width: 1025px) {
  .docs-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .docs-content > * {
    max-width: min(800px, 100%); /* Smaller max-width for tighter layouts */
  }
}

/* Mobile - sidebar becomes overlay, content takes full width */
@media (max-width: 1024px) {
  .docs-layout {
    flex-direction: column; /* Stack vertically on mobile */
  }

  .docs-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1.5rem;
    min-height: auto; /* Remove min-height constraint on mobile */
  }
}

@media (max-width: 768px) {
  .docs-content {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
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

