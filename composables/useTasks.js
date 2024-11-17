// composables/useTasks.js
import { ref } from "vue";
import { useAxios } from "~/composables/useAxios";

const tasks = ref([]);

export function useTasks() {
  const axios = useAxios(); 

  async function fetchTasks() {
    try {
      const response = await axios.get("/api/todos");
      tasks.value = response.data.data.filter((task) => task.status === 0);
      console.log("Fetched tasks:", tasks.value);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  return {
    tasks,
    fetchTasks,
  };
}
