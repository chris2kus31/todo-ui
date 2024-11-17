<!-- components/TaskRow.vue -->
<template>
  <div class="task-row">
    <!-- Directly styled checkbox to keep it independent from task text -->
    <input type="checkbox" class="task-checkbox" v-model="completed" />

    <!-- Task text, click to edit -->
    <span
      v-if="!isEditing"
      :class="{ 'task-text': true, 'completed-task': completed }"
      @click="enableEditing"
    >
      {{ taskName }}
    </span>

    <!-- Input for editing task name -->
    <input
      v-if="isEditing"
      v-model="taskName"
      class="task-input"
      @keyup.enter="saveName"
      @blur="cancelOrSave"
      placeholder="Name your task"
    />
    <!-- Delete button, visible only when the task is completed -->
    <button v-if="completed" @click="deleteTask" class="delete-button">
      Delete
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  taskText: { type: String, required: true, default: "" }, // Ensure taskText has a default value
  isEditing: { type: Boolean, default: false },
});

const emits = defineEmits(["onSave", "cancelTask"]);

const completed = ref(false);
const isEditing = ref(props.isEditing);
const taskName = ref(props.taskText);

const enableEditing = async () => {
  if (!completed.value) {
    isEditing.value = true;
    await nextTick(); // Wait for the DOM update
    document.querySelector(".task-input").focus(); // Focus the input
  }
};

function cancelOrSave() {
  if (taskName.value.trim()) {
    saveName();
  } else {
    emits("cancelTask");
  }
}

watch(
  () => props.taskText,
  (newVal) => {
    if (newVal !== undefined) {
      taskName.value = newVal;
    }
  }
);

function saveName() {
  isEditing.value = false;
  emits("onSave", taskName.value.trim() || "Unnamed Task");
}

const fakeApiDeleteCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task deleted");
      resolve();
    }, 500);
  });
};
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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.task-row:hover {
  background-color: #454e59;
}
.task-label {
  display: flex;
  align-items: center;
  gap: 10px; /* Adjusts spacing between checkbox and task text */
  cursor: pointer;
}
.task-checkbox-container {
  position: relative;
}
.task-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #f26b5e;
  border-radius: 4px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  position: relative;
}
.task-checkbox:checked {
  background-color: #f26b5e;
  border-color: #f26b5e;
}

.task-checkbox:checked::after {
  content: "";
  position: absolute;
  left: 3px; /* Center horizontally */
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.task-text {
  color: white;
  font-size: 1em;
  transition: color 0.3s ease;
  margin-left: 10px;
}
.task-input {
  background-color: #3d4552;
  color: white;
  border: 1px solid #f26b5e;
  padding: 5px;
  border-radius: 4px;
  width: 100%;
  margin-left: 10px; /* Adds spacing from the checkbox */
}
.completed-task {
  color: #a9a9a9;
  text-decoration: line-through; /* Strikethrough on completion */
}
.delete-button {
  background-color: #f26b5e;
  border: none;
  color: white;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #d5584d;
}
</style>
