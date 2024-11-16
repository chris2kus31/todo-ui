<template>
    <div class="page-wrapper">
      <div class="todo-container">
        <div class="todo-card">
          <header class="todo-header">
            <h1>Todo</h1>
            <button>+</button>
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
  background-color: #3D4552;
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
  </style>
  