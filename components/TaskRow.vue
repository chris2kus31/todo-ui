<!-- components/TaskRow.vue -->
<template>
    <div class="task-row">
      <label class="task-label">
        <input type="checkbox" class="task-checkbox" v-model="completed" />
        <span class="custom-checkbox"></span>
        <span class="task-text">{{ taskText }}</span>
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue'
  
  // Define props
  const props = defineProps({
    taskText: {
      type: String,
      required: true
    },
    initialCompleted: {
      type: Boolean,
      default: false
    }
  })
  
  // Manage the task completion state
  const completed = ref(props.initialCompleted)
  </script>
  
  <style scoped>
  .task-row {
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding: 12px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    background-color: #4b5563;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  }
  .task-row:hover {
    background-color: #454e59; /* Slightly darker background on hover */
  }
  .task-label {
    display: flex;
    align-items: center;
    gap: 10px; /* Space between checkbox and text */
    cursor: pointer;
  }
  .task-checkbox {
    display: none; /* Hide default checkbox */
  }
  .custom-checkbox {
    width: 16px;
    height: 16px;
    border: 2px solid #f26b5e; /* Action color */
    border-radius: 4px;
    display: inline-block;
    position: relative;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  .task-checkbox:checked + .custom-checkbox {
    background-color: #f26b5e; /* Filled background for checked state */
    border-color: #f26b5e;
  }
  .task-checkbox:checked + .custom-checkbox::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 0px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  .task-text {
    color: white;
    font-size: 1em;
    transition: color 0.3s ease;
  }
  .task-checkbox:checked ~ .task-text {
    color: #a9a9a9; /* Dimmed text color when checked */
    text-decoration: line-through; /* Strikethrough on completion */
  }
  </style>
  