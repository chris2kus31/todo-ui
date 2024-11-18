<!-- components/TodoCard.vue -->
<template>
  <div class="todo-card">
    <header class="todo-header">
      <h1 class="todo-title">To-do</h1>
      <!-- New Task Input -->
      <input
        type="text"
        v-model="newTaskText"
        @keyup.enter="addNewTask"
        placeholder="New task name"
        class="task-input-field"
      />
    </header>

    <!-- Toast Notification Component -->
    <ToastNotification :message="toastMessage" />

    <!-- Loading Indicator Component -->
    <LoadingIndicator :visible="loading" />

    <!-- Show placeholder when there are no tasks -->
    <div v-if="!loading && tasks.length === 0" class="empty-task">
      <img src="/add-task.png" alt="Empty Task Icon" class="empty-icon" />
      <p class="empty-message">
        Looking empty! Add your first task above and press Enter.
      </p>
    </div>

    <!-- Render TaskRow components for each task in the tasks array -->
    <div v-else class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :taskText="task.text || ''"
        :isEditing="task.isEditing"
        :taskId="task.id"
        :completed="task.completed"
        @onSave="(newName) => updateTask(task, newName)"
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
import TaskItem from "~/components/TaskItem.vue";
import { useAxios } from "~/composables/useAxios";
import { createTaskDTO } from "~/composables/dto/Task.dto";
import ToastNotification from "~/components/ToastNotification.vue";
import LoadingIndicator from "~/components/LoadingIndicator.vue";

const tasks = ref([]); // Holds the list of task items
const axios = useAxios(); // Axios instance for API calls
const newTaskText = ref(""); // Tracks the text input for a new task
const loading = ref(true); // Indicates if data is being fetched
const toastMessage = ref(""); // Message for toast notifications

// Shows a toast notification with a given message
function showToast(message) {
  toastMessage.value = message;
}

// Fetches the list of tasks from the API and initializes them in structured form
async function fetchTasks() {
  loading.value = true;
  try {
    const response = await axios.get("/api/todos");
    tasks.value = response.data.data
      .map((task) => createTaskDTO(task)) // Structure tasks with DTO
      .sort((a, b) => a.completed - b.completed || b.id - a.id); // Sort tasks by completion and ID
  } catch (error) {
    console.error("Error fetching tasks:", error);
  } finally {
    loading.value = false;
  }
}

// Fetch tasks upon component mount
onMounted(fetchTasks);

// Adds a new task to the list by posting to the API
const addNewTask = async () => {
  if (!newTaskText.value.trim()) return; // Prevent empty tasks from being added
  try {
    const response = await axios.post("/api/todos", {
      name: newTaskText.value.trim(),
    });
    tasks.value.unshift(createTaskDTO(response.data)); // Add new task to the beginning of the list
    newTaskText.value = ""; // Clear input field after task addition
    showToast("Task created successfully!"); // Notify user of successful creation
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

// Updates the name of an existing task
const updateTask = async (task, newName) => {
  // Exit edit mode if no changes are made
  if (task.text.trim() === newName.trim()) {
    task.isEditing = false;
    return;
  }

  // Set new name locally and exit edit mode
  task.text = newName;
  task.isEditing = false;

  try {
    // Update task on the server
    await axios.put(`/api/todos/${task.id}`, {
      name: newName,
      status: task.completed ? 1 : 0,
    });
    showToast("Task updated successfully!"); // Notify user of successful update
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

// Updates the completion status of a task and refreshes the task list to reapply sorting
async function updateTaskStatus(taskId, newStatus) {
  const task = tasks.value.find((task) => task.id === taskId);
  if (task) {
    task.completed = Boolean(newStatus); // Update local completion status
    await fetchTasks(); // Refresh tasks to reflect updated order
    showToast(`Task marked as ${newStatus ? "completed" : "pending"}!`); // Notify user of status change
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
  min-height: 500px;
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
  max-height: 350px;
  overflow-y: auto;
  padding-right: 10px;
  margin-top: 20px;
}
.loading-indicator {
  text-align: center;
  font-size: 1.2em;
  color: #f26b5e;
  margin-top: 20px;
}
.empty-task {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 80px;
}
.empty-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
.empty-message {
  color: #a9a9a9;
  font-size: 1.2em;
}
</style>
