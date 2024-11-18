<!-- components/ToastNotification.vue -->
<template>
  <div v-if="visible" class="toast" :class="position">{{ message }}</div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  message: { type: String, required: true },
  duration: { type: Number, default: 2000 },
  position: { type: String, default: "center" }, // Add position prop for flexibility
});

const visible = ref(false);

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      visible.value = true;
      setTimeout(() => (visible.value = false), props.duration);
    }
  }
);

onUnmounted(() => {
  visible.value = false;
});
</script>

<style scoped>
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1em;
  text-align: center;
  transition: opacity 0.3s ease-in-out;
  z-index: 10;
}

.toast.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.toast.bottom {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
