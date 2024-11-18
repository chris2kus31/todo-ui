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
import { ref, defineProps, defineEmits, watch } from "vue";
import { useAxios } from "~/composables/useAxios";
import { TrashIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  taskText: { type: String, required: true, default: "" },
  isEditing: { type: Boolean, default: false },
  taskId: { type: [Number, null], required: true },
  completed: { type: Boolean, default: false }, // Use prop to initialize completed state
});

const axios = useAxios();
const emits = defineEmits(["onSave", "cancelTask", "onDelete", "toggleComplete"])

const completed = ref(props.completed);
const isEditing = ref(props.isEditing);
const taskName = ref(props.taskText);
let saving = false;

async function markComplete() {
  const newStatus = props.completed ? 0 : 1; // Toggle based on current completed status
  try {
    await axios.patch(`/api/todos/${props.taskId}`, {
      name: taskName.value,
      status: newStatus,
    });
    emits("toggleComplete", props.taskId, newStatus); // Emit event with the new status
  } catch (error) {
    console.error("Failed to update task status:", error);
  }
}

async function completeTask() {
  try {
    await axios.patch(`/api/todos/${props.taskId}`, {
      name: taskName.value,
      status: 1,
    });
    completed.value = true;
    emits("onDelete", props.taskId); // Emit "onDelete" to trigger removal of the completed task in TodoCard
  } catch (error) {
    console.error("Failed to complete task:", error);
  }
}

const enableEditing = async () => {
  if (!completed.value) {
    isEditing.value = true;
    await nextTick();
    document.querySelector(".task-input").focus();
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

async function deleteTask() {
  try {
    await axios.delete(`/api/todos/${props.taskId}`);
    emits("onDelete"); // Emit event to refresh tasks in TodoCard
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}

async function saveName() {
  if (saving) return; // Prevent double calls
  saving = true;
  isEditing.value = false;
  emits("onSave", taskName.value.trim() || "Unnamed Task");
  saving = false;
}
</script>

<style scoped>
.task-row {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  background-color: #4B5563;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.task-row:hover {
  background-color: #454e59;
}
.task-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
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
}
.task-checkbox:checked {
  background-color: #f26b5e;
  border-color: #f26b5e;
}

.task-checkbox:checked::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 1px;
  width: 6px;
  height: 10px;
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
.complete-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.complete-button:hover {
  background-color: #45a049;
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
