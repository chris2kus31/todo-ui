export function createAnalyticsDataDTO(data) {
    return {
      completed: data?.completed ?? 0,
      created: data?.created ?? 0,
    };
  }