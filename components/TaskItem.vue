<!-- components/TaskRow.vue -->
<template>
  <div class="task-row">
    <!-- Checkbox to mark task as complete/incomplete -->
    <div class="task-checkbox-container">
      <input
        type="checkbox"
        class="task-checkbox"
        v-model="completed"
        @change="markComplete"
      />
    </div>

    <!-- Task name display, switches to input on edit mode -->
    <span
      v-if="!isEditing"
      :class="{ 'task-text': true, 'completed-task': completed }"
      @click="enableEditing"
    >
      {{ taskName }}
    </span>

    <!-- Editable task input field, appears in edit mode -->
    <input
      v-if="isEditing"
      ref="taskInputRef"
      v-model="taskName"
      class="task-input"
      @keyup.enter="saveName"
      @blur="handleBlur"
      placeholder="Name your task"
    />

    <!-- Delete task icon -->
    <TrashIcon class="trash-icon" @click="deleteTask" />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useAxios } from "~/composables/useAxios";
import { TrashIcon } from "@heroicons/vue/24/solid";

const axios = useAxios();
const props = defineProps({
  taskText: { type: String, required: true, default: "" },
  isEditing: { type: Boolean, default: false },
  taskId: { type: [Number, null], required: true },
  completed: { type: Boolean, default: false },
});

// Define emitted events for parent component communication
const emits = defineEmits([
  "onSave",
  "cancelTask",
  "onDelete",
  "toggleComplete",
]);

// Local state for task properties and editing mode
const completed = ref(props.completed);
const isEditing = ref(props.isEditing);
const taskName = ref(props.taskText);
const taskInputRef = ref(null);

// Toggles task completion status, making an API call and emitting the updated status
async function markComplete() {
  const newStatus = props.completed ? 0 : 1;
  try {
    await axios.patch(`/api/todos/${props.taskId}`, {
      name: taskName.value,
      status: newStatus,
    });
    emits("toggleComplete", props.taskId, Boolean(newStatus)); // Emit updated status to parent
  } catch (error) {
    console.error("Failed to update task status:", error);
  }
}

// Enables editing mode for task name, focusing the input
const enableEditing = async () => {
  if (!completed.value) {
    // Only allow editing if task is not completed
    isEditing.value = true;
    await nextTick(); // Ensure DOM is updated before focusing
    taskInputRef.value?.focus();
  }
};

// Handles blur event on input, saves or cancels edit based on input change
function handleBlur() {
  if (taskName.value.trim() === props.taskText.trim()) {
    cancelEdit(); // Exit edit mode if no changes
  } else {
    saveName(); // Save if changes exist
  }
}

// Exits edit mode without saving changes
function cancelEdit() {
  isEditing.value = false;
  emits("cancelTask"); // Notify parent to cancel edit
}

// Saves the task name, emits change to parent, and exits edit mode
function saveName() {
  if (!taskName.value.trim()) return cancelEdit(); // Cancel if input is empty
  isEditing.value = false;
  emits("onSave", taskName.value.trim() || "Unnamed Task"); // Save with default if empty
}

// Deletes task via API call and emits an event to refresh parent list
async function deleteTask() {
  try {
    await axios.delete(`/api/todos/${props.taskId}`);
    emits("onDelete"); // Notify parent of task deletion
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}

// Watches for prop updates to reflect any changes to task text in local state
watch(
  () => props.taskText,
  (newVal) => {
    if (newVal !== undefined) {
      taskName.value = newVal; // Keep local task name in sync with prop
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
