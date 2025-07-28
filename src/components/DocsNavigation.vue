<template>
  <div class="docs-navigation">
    <router-link
      v-if="prevPage"
      :to="prevPage.to"
      class="nav-button prev-button"
    >
      <div class="nav-button-content">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <div class="nav-text">
          <span class="nav-label">Prev</span>
          <span class="nav-title">{{ prevPage.text }}</span>
        </div>
      </div>
    </router-link>

    <router-link
      v-if="nextPage"
      :to="nextPage.to"
      class="nav-button next-button"
    >
      <div class="nav-button-content">
        <div class="nav-text">
          <span class="nav-label">Next</span>
          <span class="nav-title">{{ nextPage.text }}</span>
        </div>
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';

interface NavLink {
  to: string;
  text: string;
}

interface SidebarSection {
  title: string;
  links: NavLink[];
}

const route = useRoute();

// Inject sidebarSections from parent DocsView
const sidebarSections = inject<SidebarSection[]>('sidebarSections', []);

// Flatten all links from sidebar sections to create navigation order
const flattenedNavigation = computed(() => {
  return sidebarSections.reduce<NavLink[]>((acc, section) => {
    return acc.concat(section.links);
  }, []);
});

const currentIndex = computed(() => {
  return flattenedNavigation.value.findIndex(page => page.to === route.path);
});

const prevPage = computed(() => {
  const index = currentIndex.value;
  return index > 0 ? flattenedNavigation.value[index - 1] : null;
});

const nextPage = computed(() => {
  const index = currentIndex.value;
  return index >= 0 && index < flattenedNavigation.value.length - 1 ? flattenedNavigation.value[index + 1] : null;
});
</script>

<style scoped>
.docs-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  gap: 1rem;
}

.nav-button {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-content-bg);
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.3s ease;
  min-height: 80px;
  max-width: 280px;
  flex: 1;
  position: relative;
  overflow: hidden;
}

.nav-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-button:hover {
  border-color: var(--color-primary);
  background: var(--color-background-soft);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.nav-button:hover::before {
  left: 100%;
}

.nav-button-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  position: relative;
  z-index: 1;
}

.prev-button .nav-button-content {
  justify-content: flex-start;
}

.next-button {
  margin-left: auto;
}

.next-button .nav-button-content {
  justify-content: flex-end;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.nav-button:hover .nav-icon {
  color: var(--color-primary);
}

.nav-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.nav-button:hover .nav-label {
  color: var(--color-accent);
}

.nav-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.25;
  word-break: break-word;
  transition: color 0.3s ease;
}

.nav-button:hover .nav-title {
  color: var(--color-heading);
}

/* Responsive design */
@media (max-width: 768px) {
  .docs-navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-button {
    width: 100%;
    max-width: none;
  }

  .next-button {
    margin-left: 0;
  }

  .nav-button-content {
    justify-content: center !important;
  }

  .nav-text {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .nav-button {
    padding: 1rem;
    min-height: 70px;
  }

  .nav-icon {
    width: 18px;
    height: 18px;
  }

  .nav-label {
    font-size: 0.7rem;
  }

  .nav-title {
    font-size: 0.9rem;
  }

  .docs-navigation {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
}
</style>
