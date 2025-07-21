document.addEventListener("DOMContentLoaded", () => {
  const stats = {
    cropsPlanted: 126,
    tasksPending: 8,
    waterUsage: "1,740 L",
    weatherAlert: "Rain expected tomorrow 🌧️",
    inventoryStatus: "Low on compost"
  };

  const bestCrops = [
    { name: "Tomato", yield: "95%", status: "Excellent" },
    { name: "Lettuce", yield: "89%", status: "Very Good" },
    { name: "Spinach", yield: "85%", status: "Good" }
  ];

  function updateStats() {
    document.getElementById("cropsPlanted").textContent = stats.cropsPlanted;
    document.getElementById("tasksPending").textContent = stats.tasksPending;
    document.getElementById("waterUsage").textContent = stats.waterUsage;
    document.getElementById("weatherAlert").textContent = stats.weatherAlert;
    document.getElementById("inventoryStatus").textContent = stats.inventoryStatus;
  }

  function displayBestCrops() {
    const cropList = document.getElementById("topCropsList");
    if (!cropList) return;

    cropList.innerHTML = "";
    bestCrops.forEach(crop => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${crop.name}</strong> - ${crop.yield} (${crop.status})`;
      cropList.appendChild(li);
    });
  }

  function showNotification(message) {
    const note = document.createElement("div");
    note.className = "dashboard-notification";
    note.textContent = message;
    note.style = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #4caf50;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      font-weight: bold;
      z-index: 9999;
    `;
    document.body.appendChild(note);

    setTimeout(() => {
      note.remove();
    }, 3000);
  }

  const refreshBtn = document.getElementById("refreshDashboard");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      refreshBtn.disabled = true;
      refreshBtn.textContent = "Refreshing...";

      setTimeout(() => {
        updateStats();
        displayBestCrops();
        showNotification("Dashboard data refreshed!");
        refreshBtn.disabled = false;
        refreshBtn.textContent = "Refresh Data";
      }, 1200);
    });
  }

  // Initial load
  updateStats();
  displayBestCrops();
});
