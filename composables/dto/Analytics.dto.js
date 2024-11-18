export function createAnalyticsDTO({ created = 0, completed = 0 }) {
    return {
      labels: ["Completed Tasks", "Created Tasks"],
      datasets: [
        {
          label: "Number of Tasks",
          backgroundColor: ["#B2D198", "#F26B5E"],
          data: [completed, created],
        },
      ],
    };
  }
  
  export function createChartOptionsDTO() {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#E5E7EB", // Light gray for readability
          },
        },
        title: {
          display: true,
          text: "Overview of Completed and Created Tasks",
          color: "#FFFFFF", // White color for better readability
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Task Status",
            color: "#E5E7EB", // Light gray for readability
            font: {
              size: 14,
            },
          },
          ticks: {
            color: "#E5E7EB", // Ensures readability of x-axis labels
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Tasks",
            color: "#E5E7EB",
            font: {
              size: 14,
            },
          },
          ticks: {
            color: "#E5E7EB",
            beginAtZero: true, // Ensures y-axis starts at 0
          },
        },
      },
    };
  }
  