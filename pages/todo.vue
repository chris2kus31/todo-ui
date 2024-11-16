<template>
  <div class="page-wrapper">
    <div class="todo-container">
      <!-- Row with two cards -->
      <div class="top-row">
        <div class="top-card">
          <h2 class="card-title">Completed</h2>
        </div>
        <div class="top-card">
          <h2 class="card-title">Created</h2>
        </div>
      </div>

      <div class="todo-card">
        <header class="todo-header">
          <h1 class="todo-title">Todo</h1>
          <button class="add-button">+</button>
        </header>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.todo-container {
  background-color: #313743;
  border-radius: 12px;
  padding: 20px; /* Padding creates space around the content */
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  box-sizing: border-box; /* Ensures padding is included in total width */
}
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
.top-card {
  background-color: #3d4552;
  padding: 10px;
  border-radius: 8px;
  flex: 1; /* Allows each card to take up equal width in the row */
  text-align: center;
}
.top-row {
  display: flex;
  gap: 10px; /* Space between the two cards */
  margin-bottom: 20px; /* Space between the row and the main to-do card */
}
.card-title {
  font-size: 1.2em;
  color: white;
}
</style>
