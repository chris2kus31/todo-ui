<!-- components/ActionBar.vue -->
<template>
    <div class="actions-bar">
      <button class="filter-button">
        <AdjustmentsHorizontalIcon class="filter-icon" />
      </button>
    </div>
  </template>
  
  <script setup>
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/solid";
  </script>
  
  <style scoped>
  .actions-bar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  
  .filter-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .filter-icon {
    width: 24px;
    height: 24px;
    color: white;
  }
  
  .filter-button:hover .filter-icon {
    opacity: 0.8;
  }
  </style>
  