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
      :taskId="task.id"
      @onSave="(newName) => saveTask(task, newName)"
      @cancelTask="() => cancelTask(task)"
      @onDelete="fetchTasks" 
      @onComplete="fetchTasks" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TaskRow from "~/components/TaskRow.vue";
import { useAxios } from '~/composables/useAxios';

const tasks = ref([]);
const axios = useAxios();
let taskIdCounter = 1;
const savingTask = ref(false);
async function fetchTasks() {
  try {
    const response = await axios.get('/api/todos');
    tasks.value = response.data.data
      .filter(task => task.status === 0) // Only include incomplete tasks
      .map(task => ({
        id: task.id,
        text: task.name,
        isEditing: false,
        completed: task.status === 1
      }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

onMounted(fetchTasks);

const cancelTask = (task) => {
  // Only remove the task if it does not have an id (i.e., it's a new task)
  if (!task.id) {
    tasks.value = tasks.value.filter((t) => t !== task);
  }
};

const addTask = () => {
  // Create a temporary new task with isEditing set to true
  const newTask = { id: null, text: "", isEditing: true, completed: false };
  tasks.value.push(newTask);

  nextTick(() => {
    const taskRows = document.querySelectorAll(".task-input");
    if (taskRows.length) {
      taskRows[taskRows.length - 1].focus();
    }
  });
};

const saveTask = async (task, newName) => {
  if (savingTask.value) return; // Prevent double calls
  savingTask.value = true;

  task.text = newName;
  task.isEditing = false;

  if (task.id) {
    try {
      await axios.put(`/api/todos/${task.id}`, { name: newName, status: task.completed ? 1 : 0 });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  savingTask.value = false; // Reset flag after completion
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
