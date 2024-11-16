<!-- components/TodoCard.vue -->
<template>
  <div class="todo-card">
    <header class="todo-header">
      <h1 class="todo-title">Todo</h1>
      <button class="add-button">+</button>
    </header>

    <!-- Sample task row -->
    <div class="task-row">
      <label class="task-label">
        <input type="checkbox" class="task-checkbox" />
        <span class="custom-checkbox"></span>
        <span class="task-text">Sample Task</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
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

/* Original task-row styles */
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
</style>
