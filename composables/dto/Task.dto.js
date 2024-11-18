// src/composables/dto/Task.dto.js

export function createTaskDTO({ id = null, name = '', status = 0 }) {
    return {
      id,
      text: name,
      isEditing: false,
      completed: status === 1,
    };
  }
  