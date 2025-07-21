"use strict";

document.addEventListener('DOMContentLoaded', function () {
  const cropForm = document.getElementById('cropForm');
  const cropList = document.getElementById('cropList');

  let crops = JSON.parse(localStorage.getItem('crops')) || [];
  let editId = null;

  renderCrops();

  cropForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const crop = {
      id: editId !== null ? editId : Date.now(),
      type: document.getElementById('cropType').value,
      plantingDate: document.getElementById('plantingDate').value,
      growthStage: document.getElementById('growthStage').value,
      wateringSchedule: document.getElementById('wateringSchedule').value,
      fertilizationDate: document.getElementById('fertilizationDate').value,
      harvestingDate: document.getElementById('harvestingDate').value
    };

    if (editId !== null) {
      crops = crops.map(c => c.id === editId ? crop : c);
      editId = null;
    } else {
      crops.push(crop);
    }

    localStorage.setItem('crops', JSON.stringify(crops));
    cropForm.reset();
    renderCrops();
  });

  function renderCrops() {
    cropList.innerHTML = '';

    if (!crops || crops.length === 0) {
      cropList.innerHTML = '<p>No crop records available.</p>';
      return;
    }

    crops.forEach(crop => {
      const cropItem = document.createElement('div');
      cropItem.className = 'crop-item';
      cropItem.innerHTML = `
        <strong>${crop.type}</strong><br>
        Planting Date: ${crop.plantingDate}<br>
        Growth Stage: ${crop.growthStage}<br>
        Watering Schedule: ${crop.wateringSchedule}<br>
        Fertilization Date: ${crop.fertilizationDate}<br>
        Harvesting Date: ${crop.harvestingDate}<br>
        <button onclick="editCrop(${crop.id})">Update</button>
        <button onclick="deleteCrop(${crop.id})">Delete</button>
      `;
      cropList.appendChild(cropItem);
    });
  }

  window.deleteCrop = function(id) {
    crops = crops.filter(crop => crop.id !== id);
    localStorage.setItem('crops', JSON.stringify(crops));
    renderCrops();
  };

  window.editCrop = function(id) {
    const crop = crops.find(c => c.id === id);
    if (!crop) return;

    document.getElementById('cropType').value = crop.type;
    document.getElementById('plantingDate').value = crop.plantingDate;
    document.getElementById('growthStage').value = crop.growthStage;
    document.getElementById('wateringSchedule').value = crop.wateringSchedule;
    document.getElementById('fertilizationDate').value = crop.fertilizationDate;
    document.getElementById('harvestingDate').value = crop.harvestingDate;

    editId = crop.id;
  };
});
