<template>
  <div>
    <!-- Mobile sidebar toggle -->
    <button class="mobile-sidebar-toggle" @click="toggleSidebar">
      {{ isSidebarOpen ? 'Hide Menu' : 'Show Menu' }}
    </button>

    <div class="docs-sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
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
          <router-link to="/docs/as215011" class="sidebar-link" @click="closeMobileSidebar">AS215011 Network</router-link>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-title">DATASETS</h3>
          <router-link to="/docs/datasets" class="sidebar-link" @click="closeMobileSidebar">Available Data</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

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
  if (window.innerWidth <= 768) {
    isSidebarOpen.value = false;
    emit('update:isSidebarOpen', false);
  }
}
</script>

<style scoped>
/* Sidebar Styles */
.docs-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: rgba(26, 28, 29, 0.97);
  border-right: 1px solid var(--color-border);
  padding: 1.5rem 0;
  height: calc(100vh - var(--header-height)); /* Adjust height to account for header */
  position: fixed;
  left: 0;
  top: var(--header-height); /* Position exactly below the header */
  padding-top: 1.5rem; /* Reset padding-top to be consistent */
  overflow-y: auto;
  z-index: 4; /* Below header but above other content */
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
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

/* Mobile sidebar toggle */
.mobile-sidebar-toggle {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .docs-sidebar {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .docs-sidebar {
    width: 100%;
    height: auto;
    max-height: 0;
    overflow: hidden;
    position: static; /* Change to static positioning for mobile */
    top: auto;
    left: auto;
    padding-top: 0;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    transition: max-height 0.3s ease, padding 0.3s ease;
    padding: 0;
  }

  .docs-sidebar.sidebar-open {
    max-height: 1000px;
    padding: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .mobile-sidebar-toggle {
    display: block;
    padding: 0.75rem;
    text-align: center;
    background: var(--color-content-bg);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;
    border: none;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    position: sticky;
    top: var(--header-height); /* Use the header height variable */
    z-index: 5;
  }

  .sidebar-link {
    padding: 0.5rem 1.5rem;
  }
}
</style>
