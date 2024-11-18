<template>
  <div class="todo-container">
    <TodoCard />
  </div>
</template>

<script setup>
import TodoCard from "~/components/TodoCard.vue";
</script>

<style scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
