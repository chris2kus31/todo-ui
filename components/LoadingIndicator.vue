<!-- components/LoadingIndicator.vue -->
<template>
  <div class="loading-overlay" v-if="visible">
    <div class="spinner">
      <div class="dot dot-1"></div>
      <div class="dot dot-2"></div>
      <div class="dot dot-3"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  visible: { type: Boolean, default: true },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Spinner container */
.spinner {
  display: flex;
  gap: 8px;
}

.dot {
  width: 16px;
  height: 16px;
  background-color: #f26b5e; /* Accent color */
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.dot-1 {
  animation-delay: 0s;
}

.dot-2 {
  animation-delay: 0.2s;
}

.dot-3 {
  animation-delay: 0.4s;
}

/* Keyframes for bounce animation */
@keyframes bounce {
  0% {
    transform: translateY(0);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }
  100% {
    transform: translateY(-16px);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
  }
}
</style>
