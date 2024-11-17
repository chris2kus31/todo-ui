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


onMounted(async () => {
  try {
    const response = await axios.get('/api/todos');
    tasks.value = response.data.data.map(task => ({
      id: task.id,
      text: task.name,
      isEditing: false,
      completed: task.status === 1
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});

const cancelTask = (task) => {
  if (!task.text) {
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
  }
};

const addTask = async () => {
  const newTask = { id: null, text: "", isEditing: true, completed: false };
  tasks.value.push(newTask);

  try {
    const response = await axios.post('/api/todos', { name: "New Task" });
    newTask.id = response.data.id;
    newTask.text = response.data.name;
    
    await nextTick(() => {
      const taskRows = document.querySelectorAll(".task-input");
      if (taskRows.length) {
        taskRows[taskRows.length - 1].focus();
      }
    });
  } catch (error) {
    console.error("Failed to add task:", error);
    tasks.value.pop();
  }
};

const saveTask = async (task, newName) => {
  task.text = newName;
  task.isEditing = false;

  if (task.id) {
    try {
      await axios.put(`/api/todos/${task.id}`, { name: newName, status: task.completed ? 1 : 0 });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }
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
