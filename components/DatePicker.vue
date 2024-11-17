<template>
  <Datepicker
    v-model="dateRange"
    :inline="true"
    range
    format="YYYY-MM-DD"
    @change="onDateChange"
  />
</template>

<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: new Date(), end: new Date() }),
  },
});

const emit = defineEmits(["update:model-value", "close"]);

const dateRange = ref(props.modelValue);

const onDateChange = (value) => {
  emit("update:model-value", value);
  emit("close");
};

watch(
  () => props.modelValue,
  (newValue) => {
    dateRange.value = newValue;
  },
  { immediate: true }
);
</script>

<style scoped>
/* Additional styling if necessary */
</style>
