<!-- components/TaskRow.vue -->
<template>
  <div class="task-row">
    <div class="task-checkbox-container">
      <input
        type="checkbox"
        class="task-checkbox"
        v-model="completed"
        @change="markComplete"
      />
    </div>
    <span
      v-if="!isEditing"
      :class="{ 'task-text': true, 'completed-task': completed }"
      @click="enableEditing"
    >
      {{ taskName }}
    </span>

    <input
      v-if="isEditing"
      v-model="taskName"
      class="task-input"
      @keyup.enter="saveName"
      @blur="cancelOrSave"
      placeholder="Name your task"
    />

    <TrashIcon class="trash-icon" @click="deleteTask" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAxios } from "~/composables/useAxios";
import { TrashIcon } from "@heroicons/vue/24/solid";

const axios = useAxios();

// Define properties with expected data types
const props = defineProps({
  taskText: { type: String, required: true, default: "" }, // Task name
  isEditing: { type: Boolean, default: false }, // Edit mode flag
  taskId: { type: [Number, null], required: true }, // Unique ID or null for unsaved tasks
  completed: { type: Boolean, default: false }, // Completion status
});

// Define event emitters for parent communication
const emits = defineEmits([
  "onSave", // Triggered when saving a task's new name
  "cancelTask", // Triggered if edit is canceled
  "onDelete", // Triggered when a task is deleted
  "toggleComplete", // Triggered to toggle completion status
]);

// Local state for task's completion status, edit mode, and text
const completed = ref(props.completed);
const isEditing = ref(props.isEditing);
const taskName = ref(props.taskText);
let saving = false; // Prevents concurrent save actions

// Toggles the completion status of the task
async function markComplete() {
  const newStatus = props.completed ? 0 : 1; // Switches between completed and pending
  try {
    await axios.patch(`/api/todos/${props.taskId}`, {
      name: taskName.value,
      status: newStatus,
    });
    emits("toggleComplete", props.taskId, Boolean(newStatus)); // Emit event as Boolean for consistency
  } catch (error) {
    console.error("Failed to update task status:", error);
  }
}

// Enables edit mode for the task if it isn't completed
const enableEditing = async () => {
  if (!completed.value) {
    isEditing.value = true; // Enable edit mode
    await nextTick(); // Wait until DOM updates before focusing
    document.querySelector(".task-input").focus(); // Auto-focus on input field
  }
};

// Cancels editing if the new name is empty; otherwise, saves the name
function cancelOrSave() {
  if (taskName.value.trim()) {
    saveName();
  } else {
    emits("cancelTask"); // Emit cancel event if no name entered
  }
}

// Deletes the task and emits a deletion event
async function deleteTask() {
  try {
    await axios.delete(`/api/todos/${props.taskId}`);
    emits("onDelete"); // Trigger deletion on parent component
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}

// Saves the task's new name if modified
async function saveName() {
  if (saving) return; // Prevent duplicate saves
  saving = true;
  isEditing.value = false;
  emits("onSave", taskName.value.trim() || "Unnamed Task"); // Default name if input is empty
  saving = false;
}

// Update the task name whenever `taskText` prop changes
watch(
  () => props.taskText,
  (newVal) => {
    if (newVal !== undefined) {
      taskName.value = newVal;
    }
  }
);
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
.task-checkbox-container {
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.task-checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #f26b5e;
  border-radius: 4px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  position: relative; /* Ensure the pseudo-element positions correctly */
}
.task-checkbox:checked {
  background-color: #f26b5e;
  border-color: #f26b5e;
}

.task-checkbox:checked::after {
  content: "";
  position: absolute;
  left: 3px;
  bottom: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.task-input {
  background-color: #3d4552;
  color: white;
  border: 1px solid #f26b5e;
  padding: 5px;
  border-radius: 4px;
  width: 100%;
  margin-left: 10px;
}
.trash-icon {
  margin-left: auto;
  color: #f26b5e;
  width: 1.25em;
  height: 1.25em;
  cursor: pointer;
}
.trash-icon:hover {
  color: #d5584d;
}
.task-text {
  color: white;
  font-size: 1em;
  transition: color 0.3s ease;
  margin-left: 10px;
}
.completed-task {
  color: #a9a9a9;
  text-decoration: line-through;
}
</style>
