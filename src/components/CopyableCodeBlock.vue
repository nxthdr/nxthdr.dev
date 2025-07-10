<template>
  <div class="copyable-code-block-container">
    <pre class="code-block">{{ code }}</pre>
    <button
      class="copy-button"
      :class="{ 'copy-button-copied': copied }"
      @click="copyToClipboard"
    >
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props interface
interface Props {
  code: string; // The code string to display and copy (preserves line breaks)
}

const props = defineProps<Props>();
const copied = ref(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    // Reset after 2 seconds
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy to clipboard: ', err);
  }
};
</script>

<style scoped>
.copyable-code-block-container {
  position: relative;
  margin: 1rem 0;
}

.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 60px;
  z-index: 1;
}

.copy-button:hover {
  background-color: #1976d2;
}

.copy-button-copied {
  background-color: #4caf50 !important;
  cursor: default;
}

.copy-button-copied:hover {
  background-color: #4caf50 !important;
}
</style>
