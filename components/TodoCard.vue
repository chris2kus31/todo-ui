<!-- components/TodoCard.vue -->
<template>
  <div class="todo-card">
    <header class="todo-header">
      <h1 class="todo-title">Todo</h1>
      <input
        type="text"
        v-model="newTaskText"
        @keyup.enter="addTask"
        placeholder="New task name"
        class="task-input-field"
      />
      <button class="add-button" @click="addTask">+</button>
    </header>

    <!-- Render TaskRow components for each task in the tasks array -->
    <TaskRow
      v-for="task in tasks"
      :key="task.id"
      :taskText="task.text || ''"
      :isEditing="task.isEditing"
      :taskId="task.id"
      :completed="task.completed"
      @onSave="(newName) => saveTask(task, newName)"
      @cancelTask="() => cancelTask(task)"
      @onDelete="fetchTasks"
      @onComplete="fetchTasks"
      @toggleComplete="updateTaskStatus"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TaskRow from "~/components/TaskRow.vue";
import { useAxios } from "~/composables/useAxios";

const tasks = ref([]);
const axios = useAxios();
const newTaskText = ref("");

let taskIdCounter = 1;
const savingTask = ref(false);

async function fetchTasks() {
  try {
    const response = await axios.get("/api/todos");
    tasks.value = response.data.data.map((task) => ({
      id: task.id,
      text: task.name,
      isEditing: false,
      completed: task.status === 1, // Convert status to Boolean
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

const addTask = async () => {
  if (!newTaskText.value.trim()) return;
  try {
    const response = await axios.post("/api/todos", {
      name: newTaskText.value.trim(),
    });
    tasks.value.push({
      id: response.data.id,
      text: response.data.name,
      isEditing: false,
      completed: false,
    });
    newTaskText.value = ""; // Clear input field after adding task
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

const saveTask = async (task, newName) => {
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
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }
};

function updateTaskStatus(taskId, newStatus) {
  const task = tasks.value.find((task) => task.id === taskId);
  if (task) {
    task.completed = newStatus === 1;
  }
}
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
</style>
