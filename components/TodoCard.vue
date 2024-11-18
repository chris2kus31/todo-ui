<!-- components/TodoCard.vue -->
<template>
  <div class="todo-card">
    <header class="todo-header">
      <h1 class="todo-title">To-do</h1>
      <input
        type="text"
        v-model="newTaskText"
        @keyup.enter="addNewTask"
        placeholder="New task name"
        class="task-input-field"
      />
      <!-- <button class="add-button" @click="addTask">+</button> -->
    </header>

    <!-- Toast Notification -->
    <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>

    <!-- Task list and loading indicator -->
    <div v-if="loading" class="loading-indicator">Loading tasks...</div>

    <!-- Render TaskRow components for each task in the tasks array -->
    <div class="task-list">
      <TaskRow
        v-for="task in tasks"
        :key="task.id"
        :taskText="task.text || ''"
        :isEditing="task.isEditing"
        :taskId="task.id"
        :completed="task.completed"
        @onSave="(newName) => updateTask(task, newName)"
        @cancelTask="() => removeUnsavedTask(task)"
        @onDelete="fetchTasks"
        @toggleComplete="updateTaskStatus"
      />
    </div>
    <!-- See Analytics Button -->
    <router-link to="/analytics" class="analytics-button"
      >See Analytics</router-link
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TaskRow from "~/components/TaskRow.vue";
import { useAxios } from "~/composables/useAxios";

const tasks = ref([]);
const axios = useAxios();
const newTaskText = ref("");
const savingTask = ref(false);
const loading = ref(true);
const toastMessage = ref("");

function showToast(message) {
  toastMessage.value = message;
  setTimeout(() => {
    toastMessage.value = ""; // Clear message after 3 seconds
  }, 3000);
}

async function fetchTasks() {
  loading.value = true;
  try {
    const response = await axios.get("/api/todos");
    tasks.value = response.data.data
      .map((task) => ({
        id: task.id,
        text: task.name,
        isEditing: false,
        completed: task.status === 1,
      }))
      .sort((a, b) => a.completed - b.completed || b.id - a.id);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchTasks);

const removeUnsavedTask = (task) => {
  if (!task.id) {
    tasks.value = tasks.value.filter((t) => t !== task);
  }
};

const addNewTask = async () => {
  if (!newTaskText.value.trim()) return;
  try {
    const response = await axios.post("/api/todos", {
      name: newTaskText.value.trim(),
    });
    tasks.value.unshift({
      id: response.data.id,
      text: response.data.name,
      isEditing: false,
      completed: false,
    });
    newTaskText.value = "";
    showToast("Task created successfully!"); // Show creation toast
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

const updateTask = async (task, newName) => {
  if (task.text.trim() === newName.trim()) {
    task.isEditing = false;
    return;
  }

  task.text = newName;
  task.isEditing = false;

  if (!task.id) {
    try {
      const response = await axios.post("/api/todos", { name: newName });
      task.id = response.data.id;
      task.text = response.data.name;
      showToast("Task created successfully!"); // Show creation toast for new tasks
    } catch (error) {
      console.error("Failed to add task:", error);
      tasks.value = tasks.value.filter((t) => t !== task);
    }
  } else {
    try {
      await axios.put(`/api/todos/${task.id}`, {
        name: newName,
        status: task.completed ? 1 : 0,
      });
      showToast("Task updated successfully!"); // Show update toast
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }
};

async function updateTaskStatus(taskId, newStatus) {
  const task = tasks.value.find((task) => task.id === taskId);
  if (task) {
    try {
      await axios.put(`/api/todos/${taskId}`, {
        name: task.text,
        status: newStatus,
      });
      await fetchTasks();
      showToast(`Task marked as ${newStatus ? "completed" : "pending"}!`); // Show status change toast
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  }
}
</script>

<style scoped>
.todo-card {
  background-color: #3d4552;
  padding: 20px;
  border-radius: 8px;
  color: white;
  width: 100%;
  max-width: 600px;
  min-height: 500px; /* Ensures TodoCard maintains a minimum height */
  display: flex;
  flex-direction: column;
  position: relative;
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
.task-input-field {
  flex: 1;
  margin-right: 20px;
  margin-left: 20px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #f26b5e;
  color: #fff;
  background-color: #3d4552;
}
.analytics-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #f26b5e;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9em;
  cursor: pointer;
}
.analytics-button:hover {
  opacity: 0.9;
}
.task-list {
  max-height: 350px; /* Set a max height to trigger scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
  padding-right: 10px; /* Padding for scrollbar spacing */
  margin-top: 20px;
}
.loading-indicator {
  text-align: center;
  font-size: 1.2em;
  color: #f26b5e;
  margin-top: 20px;
}
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
</style>
