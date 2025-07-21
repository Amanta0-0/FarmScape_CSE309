const form = document.getElementById("farmForm");
const chartSection = document.getElementById("chartSection");
const barCtx = document.getElementById("barChart").getContext("2d");
const pieCtx = document.getElementById("healthPieChart").getContext("2d");

let barChart, pieChart;
const dataList = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cropName = document.getElementById("cropName").value;
  const plantingDate = document.getElementById("plantingDate").value;
  const yieldKg = parseFloat(document.getElementById("yield").value);
  const health = parseFloat(document.getElementById("health").value);

  dataList.push({ cropName, plantingDate, yieldKg, health });

  form.reset();
  showCharts();
});

function showCharts() {
  chartSection.style.display = "flex";

  const labels = dataList.map(d => `${d.cropName} (${d.plantingDate})`);
  const yieldData = dataList.map(d => d.yieldKg);
  const healthData = dataList.map(d => d.health);

  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();

  barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Yield (kg)",
        data: yieldData,
        backgroundColor: "#66bb6a",
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        label: "Health (%)",
        data: healthData,
        backgroundColor: [
          "#81c784",
          "#aed581",
          "#c5e1a5",
          "#e6ee9c",
          "#fff176"
        ]
      }]
    },
    options: {
      responsive: true
    }
  });
}
