<!-- components/TopCard.vue -->
<template>
    <div class="top-card">
      <div class="card-content">
        <component :is="iconComponent" class="card-icon" />
        <div class="card-info">
          <h2 class="card-title">{{ title }}</h2>
          <span class="card-number">{{ value }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  import { CheckCircleIcon, DocumentPlusIcon } from "@heroicons/vue/24/solid";
  
  // Props to make component dynamic
  const props = defineProps({
    icon: { type: String, required: true }, // Icon name as prop
    title: { type: String, required: true },
    value: { type: Number, required: true },
  });
  
  // Map icon prop to icon component
  const iconComponent = {
    CheckCircleIcon,
    DocumentPlusIcon,
  }[props.icon];
  </script>
  
  <style scoped>
  .top-card {
    background-color: #4b5563;
    padding: 15px;
    border-radius: 8px;
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  .card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .card-icon {
    width: 32px;
    height: 32px;
    color: #f26b5e;
  }
  
  .card-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .card-title {
    font-size: 1em;
    color: white;
    margin: 0;
  }
  
  .card-number {
    font-size: 1.5em;
    font-weight: bold;
    color: white;
  }
  </style>
  