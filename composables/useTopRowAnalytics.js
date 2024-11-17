// composables/useTopRowAnalytics.js
import { ref } from "vue";
import { useAxios } from "~/composables/useAxios";

const analyticsData = ref({
  created: 0,
  completed: 0,
});

export function useTopRowAnalytics() {
  const axios = useAxios();

  async function fetchAnalyticsData(startDate, endDate) {
    try {
      const response = await axios.get("/api/analytics", {
        params: {
          from: startDate.toISOString().split("T")[0],
          to: endDate.toISOString().split("T")[0],
        },
      });
      analyticsData.value = response.data;
      console.log("Fetched analytics data:", analyticsData.value);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  }

  return {
    analyticsData,
    fetchAnalyticsData,
  };
}
