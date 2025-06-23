<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'

// Function to handle scroll events and ensure header stays fixed
const handleScroll = () => {
  // This helps ensure that scroll behavior is consistent
  document.documentElement.dataset.scrollY = window.scrollY.toString()
}

onMounted(() => {
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true })
  // Initial call to set the correct position
  handleScroll()
})

onBeforeUnmount(() => {
  // Clean up event listener
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style>
.app-container {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  /* Prevent any scroll behavior conflicts */
  overflow-anchor: none;
}
</style>
