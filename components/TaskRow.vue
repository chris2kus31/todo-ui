<!-- components/TaskRow.vue -->
<template>
  <div class="task-row">
    <!-- Separate div for checkbox to keep it independent from task text -->
    <div class="task-checkbox-container">
      <input type="checkbox" class="task-checkbox" v-model="completed" />
      <span class="custom-checkbox"></span>
    </div>

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

const enableEditing = () => {
  // Only activate edit mode if not completed
  if (!completed.value) {
    isEditing.value = true;
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
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjusts space between checkbox and input */
}
.task-checkbox {
  display: none;
}
.custom-checkbox {
  width: 16px;
  height: 16px;
  border: 2px solid #f26b5e;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.task-checkbox:checked + .custom-checkbox {
  background-color: #f26b5e;
  border-color: #f26b5e;
}
.task-checkbox:checked + .custom-checkbox::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 0px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.task-text {
  color: white;
  font-size: 1em;
  transition: color 0.3s ease;
}
.task-checkbox:checked ~ .task-text {
  color: #a9a9a9;
  text-decoration: line-through;
}
.task-input {
  background-color: #3d4552;
  color: white;
  border: 1px solid #f26b5e;
  padding: 5px;
  border-radius: 4px;
  width: 100%;
}
.completed-task {
  color: #a9a9a9;
  text-decoration: line-through; /* Strikethrough on completion */
}
</style>
