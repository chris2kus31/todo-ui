<template>
  <div class="page-wrapper">
    <div class="todo-container">
      <!-- New actions bar -->
      <div class="actions-bar">
        <AdjustmentsHorizontalIcon class="filter-icon" />
      </div>

      <!-- Row with two cards -->
      <div class="top-row">
        <div class="top-card">
          <h2 class="card-title">Completed</h2>
        </div>
        <div class="top-card">
          <h2 class="card-title">Created</h2>
        </div>
      </div>
      
      <!-- Row with todo-card -->
      <div class="todo-card">
        <header class="todo-header">
          <h1 class="todo-title">Todo</h1>
          <button class="add-button">+</button>
        </header>
        <!-- Row with tasks -->
        <div class="task-row">
          <label class="task-label">
            <input type="checkbox" class="task-checkbox" />
            <span class="custom-checkbox"></span>
            <span class="task-text">Sample Task</span>
          </label>
        </div>
      </div>

      <div class="analytics-card">
        <h2 class="card-title">Graph Analytics</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/solid";
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.todo-container {
  background-color: #313743;
  border-radius: 12px;
  padding: 20px; /* Padding creates space around the content */
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  box-sizing: border-box; /* Ensures padding is included in total width */
}
.todo-card {
  background-color: #3d4552;
  padding: 20px;
  border-radius: 8px;
  color: white;
}
.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-title {
  font-size: 1.5em;
  color: white;
}
.add-button {
  background-color: #f26b5e;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2em;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.add-button:hover {
  opacity: 0.9;
}
.top-card {
  background-color: #3d4552;
  padding: 10px;
  border-radius: 8px;
  flex: 1; /* Allows each card to take up equal width in the row */
  text-align: center;
}
.top-row {
  display: flex;
  gap: 10px; /* Space between the two cards */
  margin-bottom: 20px; /* Space between the row and the main to-do card */
}
.card-title {
  font-size: 1.2em;
  color: white;
}
.task-row {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
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
.analytics-card {
  background-color: #3d4552; /* Matches other cards */
  padding: 20px;
  border-radius: 8px;
  color: white;
  text-align: center;
}
.actions-bar {
  display: flex;
  justify-content: flex-end; /* Align filter icon to the right */
  margin-bottom: 10px; /* Space between actions bar and top-row */
}
.filter-icon {
  width: 24px;
  height: 24px;
  color: white;
  cursor: pointer;
}
.filter-icon:hover {
  opacity: 0.8;
}
</style>
