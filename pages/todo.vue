<template>
  <div class="page-wrapper">
    <div class="todo-container">

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
  padding: 20px;
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.todo-card {
  background-color: #3d4552;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
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
