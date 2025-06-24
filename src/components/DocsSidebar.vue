<template>
  <div>
    <!-- Mobile sidebar toggle -->
    <button class="mobile-sidebar-toggle" @click="toggleSidebar">
      <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      {{ isSidebarOpen ? 'Hide Menu' : 'Menu' }}
    </button>

    <!-- Backdrop overlay (mobile only) -->
    <div
      class="sidebar-backdrop"
      v-show="isSidebarOpen"
      @click="closeMobileSidebar"
      aria-hidden="true"
    ></div>

    <div class="docs-sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <!-- Mobile-only header (only visible on mobile) -->
      <div class="sidebar-mobile-header">
        <button class="sidebar-close-btn" @click="closeMobileSidebar" aria-label="Close sidebar">
          ×
        </button>
      </div>

      <!-- Sidebar content container - no changes to this structure to preserve desktop version -->
      <div class="sidebar-content">
        <!-- Use custom sections if provided, otherwise use default sections -->
        <template v-if="sections && sections.length > 0">
          <div v-for="(section, index) in sections" :key="index" class="sidebar-section">
            <h3 class="sidebar-title">{{ section.title }}</h3>
            <router-link
              v-for="link in section.links"
              :key="link.to"
              :to="link.to"
              class="sidebar-link"
              @click="closeMobileSidebar"
            >
              {{ link.text }}
            </router-link>
          </div>
        </template>

        <!-- Default sidebar content if no sections provided -->
        <template v-else>
          <div class="sidebar-section">
            <h3 class="sidebar-title">INFRASTRUCTURE</h3>
            <router-link to="/docs/infrastructure" class="sidebar-link" @click="closeMobileSidebar">Overview</router-link>
            <router-link to="/docs/as215011" class="sidebar-link" @click="closeMobileSidebar">as215011</router-link>
          </div>
          <div class="sidebar-section">
            <h3 class="sidebar-title">DATASETS</h3>
            <router-link to="/docs/datasets" class="sidebar-link" @click="closeMobileSidebar">Available Data</router-link>
          </div>
        </template>
      </div>

      <!-- Spacer to ensure the sidebar content doesn't go behind the footer -->
      <div class="sidebar-footer-spacer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Define the types for the sidebar sections
interface SidebarLink {
  to: string;
  text: string;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const props = defineProps({
  initialSidebarState: {
    type: Boolean,
    default: false
  },
  // Optional props for customizing the sidebar content
  sections: {
    type: Array as () => SidebarSection[],
    default: () => []
  }
});

const emit = defineEmits(['update:isSidebarOpen']);

const isSidebarOpen = ref(props.initialSidebarState);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  emit('update:isSidebarOpen', isSidebarOpen.value);
}

function closeMobileSidebar() {
  isSidebarOpen.value = false;
  emit('update:isSidebarOpen', false);
}

// Close sidebar on escape key press
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isSidebarOpen.value) {
    closeMobileSidebar();
  }
}

// Add event listener for escape key
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
/* Sidebar Styles */
.docs-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: rgba(26, 28, 29, 0.97);
  border-right: 1px solid var(--color-border);
  position: fixed;
  left: 0;
  top: var(--header-height); /* Position exactly below the header */
  bottom: 0; /* Extend to the bottom of the viewport */
  padding: 1.5rem 0; /* Consistent padding */
  padding-bottom: 0; /* We'll handle the footer spacing differently */
  overflow-y: auto;
  z-index: 4; /* Below header but above other content */
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.sidebar-open {
  left: 0;
}

.sidebar-section {
  margin-bottom: 2.5rem;
}

.sidebar-title {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 600;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
  letter-spacing: 0.08em;
}

.sidebar-link {
  display: block;
  padding: 0.6rem 1.5rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  margin-bottom: 2px;
}

.sidebar-link:hover {
  background-color: rgba(59, 130, 246, 0.15);
  color: var(--color-accent);
}

.sidebar-link.router-link-active {
  background-color: rgba(59, 130, 246, 0.15);
  color: var(--color-accent);
  border-left: 3px solid var(--color-accent);
  font-weight: 600;
}

/* Mobile elements - all hidden on desktop */
.mobile-sidebar-toggle,
.sidebar-backdrop,
.sidebar-mobile-header,
.sidebar-close-btn {
  display: none; /* Hide all mobile elements on desktop */
}

/* Keep the original desktop sidebar structure */
.sidebar-content {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding-bottom: 1.5rem;
}

.sidebar-footer-spacer {
  flex: 0 0 auto;
  height: var(--footer-height, 300px);
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .docs-sidebar {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .docs-sidebar {
    width: 85%; /* Not full width to allow some content visibility */
    max-width: 300px;
    height: calc(100vh - var(--header-height));
    position: fixed;
    top: var(--header-height);
    left: -100%; /* Start off-screen */
    bottom: 0;
    padding: 1rem 0;
    border-right: 1px solid var(--color-border);
    transition: left 0.3s ease;
    overflow-y: auto;
    z-index: 10; /* Higher z-index to appear above content */
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.4);
  }

  .sidebar-footer-spacer {
    display: none; /* Hide the spacer on mobile */
  }

  .docs-sidebar.sidebar-open {
    left: 0; /* Slide in from left */
  }

  /* Show the mobile header only when sidebar is open on mobile */
  .docs-sidebar.sidebar-open .sidebar-mobile-header {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  /* Overlay for sidebar background when open */
  /* Removed the pseudo-element overlay, using dedicated overlay element instead */

  .mobile-sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1rem;
    background: var(--color-content-bg);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--color-border);
    width: auto;
    max-width: 120px;
    margin: 0.75rem 1rem;
    border-radius: 4px;
    position: sticky;
    top: calc(var(--header-height) + 0.5rem); /* Position below header with some spacing */
    z-index: 5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }

  .mobile-sidebar-toggle:hover,
  .mobile-sidebar-toggle:focus {
    background: var(--color-primary);
    color: white;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
  }

  .menu-icon {
    margin-right: 6px;
  }

  .sidebar-link {
    padding: 0.5rem 1.5rem;
  }

  /* Backdrop for the mobile sidebar */
  .sidebar-backdrop {
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: 100%;
    height: calc(100vh - var(--header-height));
    background-color: rgba(0, 0, 0, 0.7); /* Darker for better contrast */
    z-index: 9;
    transition: opacity 0.3s ease;
    display: block; /* Show on mobile */
  }

  /* Mobile sidebar header styling */
  .sidebar-mobile-header {
    display: none; /* Always hidden by default */
  }

  .sidebar-close-btn {
    background: transparent;
    border: none;
    color: var(--color-text);
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .sidebar-close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--color-accent);
  }
}
</style>
