<!-- components/TodoCard.vue -->
<template>
  <div class="todo-card">
    <header class="todo-header">
      <h1 class="todo-title">Todo</h1>
      <button class="add-button" @click="addTask">+</button>
    </header>

    <!-- Render TaskRow components for each task in the tasks array -->
    <TaskRow
      v-for="task in tasks"
      :key="task.id"
      :taskText="task.text || ''"
      :isEditing="task.isEditing"
      @onSave="(newName) => saveTask(task, newName)"
      @cancelTask="() => cancelTask(task)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskRow from "~/components/TaskRow.vue";

const tasks = ref([]);
let taskIdCounter = 1;

const cancelTask = (task) => {
  if (!task.text) {
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
  }
};

const addTask = () => {
  tasks.value.push({
    id: taskIdCounter++,
    text: "",
    isEditing: true,
  });

  nextTick(() => {
    const taskRows = document.querySelectorAll(".task-input");
    if (taskRows.length) {
      taskRows[taskRows.length - 1].focus();
    }
  });
};

const saveTask = (task, newName) => {
  if (newName) {
    // Check that newName is defined before updating
    task.text = newName;
  }
  task.isEditing = false;

  fakeApiCall({ name: task.text })
    .then((response) => {
      console.log("Task saved:", response);
    })
    .catch((error) => console.error("Failed to save task:", error));
};

// Mock API call
const fakeApiCall = (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: payload });
    }, 500);
  });
};
</script>

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
</style>
