/**
 * Convoy Management System - Main Application
 * Handles UI interactions, data persistence, and real-time updates
 */

class ConvoyApp {
  constructor() {
    this.calculator = new ConvoyCalculator();
    this.vehicles = [];
    this.convoyVehicles = [];
    this.editingVehicleId = null;

    this.initializeEventListeners();
    this.loadFromStorage();
    this.updateUI();
  }

  initializeEventListeners() {
    // Vehicle form submission
    document.getElementById("vehicleForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleVehicleSubmit();
    });

    // Clear form button
    document.getElementById("clearForm").addEventListener("click", () => {
      this.clearForm();
    });

    // Vehicle type change (show/hide military class)
    document.getElementById("vehicleType").addEventListener("change", (e) => {
      const militaryClassGroup =
        document.getElementById("militaryClass").parentElement;
      if (e.target.value === "military") {
        militaryClassGroup.style.display = "flex";
      } else {
        militaryClassGroup.style.display = "none";
        document.getElementById("militaryClass").value = "";
      }
    });
  }

  handleVehicleSubmit() {
    const formData = this.getFormData();

    if (this.editingVehicleId) {
      // Update existing vehicle
      this.updateVehicle(this.editingVehicleId, formData);
    } else {
      // Create new vehicle
      this.addVehicle(formData);
    }
  }

  getFormData() {
    const form = document.getElementById("vehicleForm");
    const formData = new FormData(form);

    const specs = {
      vehicleName: formData.get("vehicleName") || "",
      make: formData.get("make") || "",
      model: formData.get("model") || "",
      year: formData.get("year") ? parseInt(formData.get("year")) : null,
      topSpeed: formData.get("topSpeed")
        ? parseInt(formData.get("topSpeed"))
        : 0,
      vehicleType: formData.get("vehicleType") || "",
      driveType: formData.get("driveType") || "",
      horsepower: formData.get("horsepower")
        ? parseInt(formData.get("horsepower"))
        : null,
      cylinders: formData.get("cylinders")
        ? parseInt(formData.get("cylinders"))
        : null,
      displacement: formData.get("displacement")
        ? parseFloat(formData.get("displacement"))
        : null,
      weight: formData.get("weight") ? parseInt(formData.get("weight")) : null,
      militaryClass: formData.get("militaryClass") || null,
    };

    // Get values directly from form elements for better compatibility
    specs.vehicleName = document.getElementById("vehicleName").value;
    specs.make = document.getElementById("make").value;
    specs.model = document.getElementById("model").value;
    specs.year = document.getElementById("year").value
      ? parseInt(document.getElementById("year").value)
      : null;
    specs.topSpeed = document.getElementById("topSpeed").value
      ? parseInt(document.getElementById("topSpeed").value)
      : 0;
    specs.vehicleType = document.getElementById("vehicleType").value;
    specs.driveType = document.getElementById("driveType").value;
    specs.horsepower = document.getElementById("horsepower").value
      ? parseInt(document.getElementById("horsepower").value)
      : null;
    specs.cylinders = document.getElementById("cylinders").value
      ? parseInt(document.getElementById("cylinders").value)
      : null;
    specs.displacement = document.getElementById("displacement").value
      ? parseFloat(document.getElementById("displacement").value)
      : null;
    specs.weight = document.getElementById("weight").value
      ? parseInt(document.getElementById("weight").value)
      : null;
    specs.militaryClass =
      document.getElementById("militaryClass").value || null;

    return specs;
  }

  addVehicle(specs) {
    const vehicle = this.calculator.calculateVehicle(specs);

    if (vehicle.error) {
      alert(`Error creating vehicle: ${vehicle.error}`);
      return;
    }

    this.vehicles.push(vehicle);
    this.saveToStorage();
    this.updateUI();
    this.clearForm();

    // Show success message
    this.showMessage(
      `Vehicle "${vehicle.displayName}" added successfully!`,
      "success"
    );
  }

  updateVehicle(vehicleId, specs) {
    const index = this.vehicles.findIndex((v) => v.id === vehicleId);
    if (index === -1) return;

    const oldVehicle = this.vehicles[index];
    const vehicle = this.calculator.calculateVehicle(specs);

    if (vehicle.error) {
      alert(`Error updating vehicle: ${vehicle.error}`);
      return;
    }

    // Preserve the original ID and tracking data
    vehicle.id = vehicleId;
    vehicle.condition = oldVehicle.condition || vehicle.condition;
    vehicle.cargo = oldVehicle.cargo || vehicle.cargo;
    vehicle.createdAt = oldVehicle.createdAt || vehicle.createdAt;

    // Update max durability if base durability changed
    if (
      vehicle.condition &&
      vehicle.statistics.durability !== oldVehicle.statistics.durability
    ) {
      const durabilityDiff =
        vehicle.statistics.durability - oldVehicle.statistics.durability;
      vehicle.condition.maxDurability += durabilityDiff;
      vehicle.condition.currentDurability += durabilityDiff;
    }

    // Update max cargo capacity if changed
    if (
      vehicle.cargo &&
      vehicle.statistics.cargoCapacity !== oldVehicle.statistics.cargoCapacity
    ) {
      vehicle.cargo.maxCapacity = vehicle.statistics.cargoCapacity;
    }

    // Initialize condition and apply modifiers
    this.calculator.initializeCondition(vehicle);

    this.vehicles[index] = vehicle;

    // Update convoy if this vehicle is in it
    const convoyIndex = this.convoyVehicles.findIndex(
      (v) => v.id === vehicleId
    );
    if (convoyIndex !== -1) {
      this.convoyVehicles[convoyIndex] = vehicle;
    }

    this.editingVehicleId = null;
    this.saveToStorage();
    this.updateUI();
    this.clearForm();

    this.showMessage(
      `Vehicle "${vehicle.displayName}" updated successfully!`,
      "success"
    );
  }

  deleteVehicle(vehicleId) {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    if (confirm(`Are you sure you want to delete "${vehicle.displayName}"?`)) {
      // Remove from vehicles list
      this.vehicles = this.vehicles.filter((v) => v.id !== vehicleId);

      // Remove from convoy if present
      this.convoyVehicles = this.convoyVehicles.filter(
        (v) => v.id !== vehicleId
      );

      this.saveToStorage();
      this.updateUI();

      this.showMessage(`Vehicle "${vehicle.displayName}" deleted.`, "info");
    }
  }

  editVehicle(vehicleId) {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    this.editingVehicleId = vehicleId;
    this.populateForm(vehicle.specs);

    // Update form button text
    const submitBtn = document.querySelector(
      '#vehicleForm button[type="submit"]'
    );
    submitBtn.textContent = "Update Vehicle";
    submitBtn.className = "btn btn-success";

    // Scroll to form
    document.querySelector(".section").scrollIntoView({ behavior: "smooth" });
  }

  populateForm(specs) {
    document.getElementById("vehicleName").value = specs.vehicleName || "";
    document.getElementById("make").value = specs.make || "";
    document.getElementById("model").value = specs.model || "";
    document.getElementById("year").value = specs.year || "";
    document.getElementById("topSpeed").value = specs.topSpeed || "";
    document.getElementById("vehicleType").value = specs.vehicleType || "";
    document.getElementById("driveType").value = specs.driveType || "";
    document.getElementById("horsepower").value = specs.horsepower || "";
    document.getElementById("cylinders").value = specs.cylinders || "";
    document.getElementById("displacement").value = specs.displacement || "";
    document.getElementById("weight").value = specs.weight || "";
    document.getElementById("militaryClass").value = specs.militaryClass || "";

    // Show/hide military class based on vehicle type
    const militaryClassGroup =
      document.getElementById("militaryClass").parentElement;
    if (specs.vehicleType === "military") {
      militaryClassGroup.style.display = "flex";
    } else {
      militaryClassGroup.style.display = "none";
    }
  }

  clearForm() {
    document.getElementById("vehicleForm").reset();
    this.editingVehicleId = null;

    // Reset form button
    const submitBtn = document.querySelector(
      '#vehicleForm button[type="submit"]'
    );
    submitBtn.textContent = "Add Vehicle";
    submitBtn.className = "btn btn-primary";

    // Hide military class
    document.getElementById("militaryClass").parentElement.style.display =
      "none";
  }

  addToConvoy(vehicleId) {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    // Check if already in convoy
    if (this.convoyVehicles.find((v) => v.id === vehicleId)) {
      this.showMessage(
        `"${vehicle.displayName}" is already in the convoy.`,
        "warning"
      );
      return;
    }

    this.convoyVehicles.push(vehicle);
    this.saveToStorage();
    this.updateUI();

    this.showMessage(`"${vehicle.displayName}" added to convoy.`, "success");
  }

  removeFromConvoy(vehicleId) {
    const vehicle = this.convoyVehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    this.convoyVehicles = this.convoyVehicles.filter((v) => v.id !== vehicleId);
    this.saveToStorage();
    this.updateUI();

    this.showMessage(`"${vehicle.displayName}" removed from convoy.`, "info");
  }

  updateUI() {
    this.renderVehicleList();
    this.renderConvoy();
    this.renderConvoyStats();
  }

  renderVehicleList() {
    const container = document.getElementById("vehicleList");

    if (this.vehicles.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    No vehicles created yet. Add your first vehicle using the form on the left.
                </div>
            `;
      return;
    }

    container.innerHTML = this.vehicles
      .map((vehicle) => {
        // Initialize tracking systems if missing
        this.calculator.initializeCondition(vehicle);
        this.calculator.initializeCargo(vehicle);

        const conditionColor = this.getConditionColor(
          vehicle.condition.conditionState
        );
        const cargoPercent = Math.round(
          (vehicle.cargo.currentLoad / vehicle.cargo.maxCapacity) * 100
        );

        return `
             <div class="vehicle-item">
                 <div class="vehicle-header">
                     <div class="vehicle-name">${vehicle.displayName}</div>
                     <div class="vehicle-actions">
                         <button class="btn btn-success btn-small" onclick="app.showVehicleDetails('${
                           vehicle.id
                         }')">
                             Details
                         </button>
                         <button class="btn btn-success btn-small" onclick="app.addToConvoy('${
                           vehicle.id
                         }')">
                             Add to Convoy
                         </button>
                         <button class="btn btn-primary btn-small" onclick="app.editVehicle('${
                           vehicle.id
                         }')">
                             Edit
                         </button>
                         <button class="btn btn-danger btn-small" onclick="app.deleteVehicle('${
                           vehicle.id
                         }')">
                             Delete
                         </button>
                     </div>
                 </div>
                 
                 <!-- Condition and Cargo Status -->
                 <div style="display: flex; gap: 10px; margin: 10px 0; font-size: 12px;">
                     <div style="padding: 4px 8px; background: ${conditionColor}; color: white; border-radius: 12px;">
                         ${vehicle.condition.conditionState} (${
          vehicle.condition.currentDurability
        }/${vehicle.condition.maxDurability} DUR)
                         ${this.getConditionPenalties(
                           vehicle.condition.conditionState
                         )}
                     </div>
                     <div style="padding: 4px 8px; background: #6c757d; color: white; border-radius: 12px;">
                         Cargo: ${vehicle.cargo.currentLoad}/${
          vehicle.cargo.maxCapacity
        } (${cargoPercent}%)
                     </div>
                 </div>
                 
                 <div class="stats-grid">
                     <div class="stat-item">
                         <div class="stat-label">SPD</div>
                         <div class="stat-value">${this.getStatDisplay(
                           vehicle.statistics.speedRating,
                           vehicle.statistics.baseSpeedRating
                         )}</div>
                     </div>
                     <div class="stat-item">
                         <div class="stat-label">FC</div>
                         <div class="stat-value">${this.getStatDisplay(
                           vehicle.statistics.fuelConsumption,
                           vehicle.statistics.baseFuelConsumption
                         )}</div>
                     </div>
                     <div class="stat-item">
                         <div class="stat-label">CC</div>
                         <div class="stat-value">${
                           vehicle.statistics.cargoCapacity
                         }</div>
                     </div>
                     <div class="stat-item">
                         <div class="stat-label">MAN</div>
                         <div class="stat-value">${
                           vehicle.statistics.maneuverability
                         }${this.getDisadvantageIndicator(
          vehicle.condition.conditionState,
          "MAN"
        )}</div>
                     </div>
                     <div class="stat-item">
                         <div class="stat-label">DUR</div>
                         <div class="stat-value">${
                           vehicle.condition.currentDurability
                         }/${vehicle.statistics.durability}</div>
                     </div>
                     <div class="stat-item">
                         <div class="stat-label">PWR</div>
                         <div class="stat-value">${
                           vehicle.statistics.powerRating
                         }${this.getDisadvantageIndicator(
          vehicle.condition.conditionState,
          "PWR"
        )}</div>
                     </div>
                     <div class="stat-item">
                         <div class="stat-label">MC</div>
                         <div class="stat-value">${this.getStatDisplay(
                           vehicle.statistics.maintenanceCost,
                           vehicle.statistics.baseMaintenanceCost
                         )}</div>
                     </div>
                     <div class="stat-item">
                         <div class="stat-label">Speed</div>
                         <div class="stat-value">${
                           vehicle.statistics.sustainableSpeed
                         } km/h</div>
                     </div>
                 </div>
             </div>
           `;
      })
      .join("");
  }

  renderConvoy() {
    const container = document.getElementById("convoyVehicles");

    if (this.convoyVehicles.length === 0) {
      container.innerHTML = `
                <div class="empty-state" style="width: 100%; padding: 20px;">
                    Drag vehicles here or click "Add to Convoy" to build your convoy
                </div>
            `;
      return;
    }

    container.innerHTML = this.convoyVehicles
      .map(
        (vehicle) => `
            <div class="convoy-vehicle-tag">
                ${vehicle.specs.vehicleName}
                <button class="remove-btn" onclick="app.removeFromConvoy('${vehicle.id}')" title="Remove from convoy">
                    ×
                </button>
            </div>
        `
      )
      .join("");
  }

  renderConvoyStats() {
    const convoyStats = this.calculator.calculateConvoy(this.convoyVehicles);
    const statsSection = document.getElementById("convoyStats");

    if (this.convoyVehicles.length === 0) {
      statsSection.style.display = "none";
      return;
    }

    statsSection.style.display = "block";

    // Update individual stat displays
    document.getElementById("convoySpeed").textContent =
      convoyStats.statistics.convoySpeed;
    document.getElementById("convoyFC").textContent =
      convoyStats.statistics.totalFuelConsumption;
    document.getElementById("convoyCC").textContent =
      convoyStats.statistics.totalCargoCapacity;
    document.getElementById("convoyMAN").textContent =
      convoyStats.statistics.averageManeuverability;
    document.getElementById("convoyDUR").textContent =
      convoyStats.statistics.totalDurability;
    document.getElementById("convoyPWR").textContent =
      convoyStats.statistics.totalPowerRating;

    // Update operational summary
    document.getElementById("operationalText").textContent =
      convoyStats.summary;
  }

  showMessage(message, type = "info") {
    // Create a temporary message element
    const messageEl = document.createElement("div");
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;

    // Set background color based on type
    const colors = {
      success: "#51cf66",
      warning: "#ffd43b",
      error: "#ff6b6b",
      info: "#339af0",
    };
    messageEl.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(messageEl);

    // Remove after 3 seconds
    setTimeout(() => {
      messageEl.style.opacity = "0";
      messageEl.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
        }
      }, 300);
    }, 3000);
  }

  saveToStorage() {
    try {
      const data = {
        vehicles: this.vehicles,
        convoyVehicles: this.convoyVehicles.map((v) => v.id), // Only save IDs for convoy
      };
      localStorage.setItem("convoyManagementData", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem("convoyManagementData");
      if (data) {
        const parsed = JSON.parse(data);
        this.vehicles = parsed.vehicles || [];

        // Initialize missing tracking systems for existing vehicles
        this.vehicles.forEach((vehicle) => {
          this.calculator.initializeCondition(vehicle);
          this.calculator.initializeCargo(vehicle);
        });

        // Reconstruct convoy vehicles from IDs
        if (parsed.convoyVehicles && Array.isArray(parsed.convoyVehicles)) {
          this.convoyVehicles = parsed.convoyVehicles
            .map((id) => this.vehicles.find((v) => v.id === id))
            .filter((v) => v); // Remove any undefined vehicles
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      this.vehicles = [];
      this.convoyVehicles = [];
    }
  }

  // Damage and Maintenance Methods

  applyDamageToVehicle(
    vehicleId,
    damageAmount,
    damageType = "Physical",
    source = "Unknown"
  ) {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    const result = this.calculator.applyDamage(
      vehicle,
      damageAmount,
      damageType,
      source
    );

    // Update convoy if this vehicle is in it
    const convoyIndex = this.convoyVehicles.findIndex(
      (v) => v.id === vehicleId
    );
    if (convoyIndex !== -1) {
      this.convoyVehicles[convoyIndex] = vehicle;
    }

    this.saveToStorage();
    this.updateUI();

    this.showMessage(
      `${damageAmount} damage applied to "${vehicle.displayName}". Condition: ${result.conditionState}`,
      result.conditionState === "Critical" ? "error" : "warning"
    );

    return result;
  }

  performMaintenanceOnVehicle(
    vehicleId,
    repairAmount,
    partsCost = 0,
    timeSpent = 0,
    notes = ""
  ) {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    const result = this.calculator.performMaintenance(
      vehicle,
      repairAmount,
      partsCost,
      timeSpent,
      notes
    );

    // Update convoy if this vehicle is in it
    const convoyIndex = this.convoyVehicles.findIndex(
      (v) => v.id === vehicleId
    );
    if (convoyIndex !== -1) {
      this.convoyVehicles[convoyIndex] = vehicle;
    }

    this.saveToStorage();
    this.updateUI();

    this.showMessage(
      `Maintenance completed on "${vehicle.displayName}". Repaired ${result.repairApplied} durability.`,
      "success"
    );

    return result;
  }

  // Cargo Management Methods

  addCargoToVehicle(
    vehicleId,
    itemName,
    weight,
    category = "General",
    notes = ""
  ) {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    const result = this.calculator.addCargo(
      vehicle,
      itemName,
      weight,
      category,
      notes
    );

    if (result.success) {
      // Update convoy if this vehicle is in it
      const convoyIndex = this.convoyVehicles.findIndex(
        (v) => v.id === vehicleId
      );
      if (convoyIndex !== -1) {
        this.convoyVehicles[convoyIndex] = vehicle;
      }

      this.saveToStorage();
      this.updateUI();

      this.showMessage(
        `Added "${itemName}" (${weight} units) to "${vehicle.displayName}"`,
        "success"
      );
    } else {
      this.showMessage(result.error, "error");
    }

    return result;
  }

  removeCargoFromVehicle(vehicleId, itemId) {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    const result = this.calculator.removeCargo(vehicle, itemId);

    if (result.success) {
      // Update convoy if this vehicle is in it
      const convoyIndex = this.convoyVehicles.findIndex(
        (v) => v.id === vehicleId
      );
      if (convoyIndex !== -1) {
        this.convoyVehicles[convoyIndex] = vehicle;
      }

      this.saveToStorage();
      this.updateUI();

      this.showMessage(
        `Removed "${result.removedItem.name}" from "${vehicle.displayName}"`,
        "info"
      );
    } else {
      this.showMessage(result.error, "error");
    }

    return result;
  }

  // Travel Planning Methods

  calculateTravelPlan(
    distanceKm,
    terrainModifier = 1.0,
    weatherModifier = 1.0
  ) {
    if (this.convoyVehicles.length === 0) {
      this.showMessage("Add vehicles to convoy first", "warning");
      return null;
    }

    const travelPlan = this.calculator.calculateTravelPlan(
      this.convoyVehicles,
      distanceKm,
      terrainModifier,
      weatherModifier
    );

    return travelPlan;
  }

  // Export/Import functionality
  exportData() {
    const data = {
      vehicles: this.vehicles,
      convoyVehicles: this.convoyVehicles.map((v) => v.id),
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `convoy-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showMessage("Data exported successfully!", "success");
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (data.vehicles && Array.isArray(data.vehicles)) {
          this.vehicles = data.vehicles;

          // Reconstruct convoy
          if (data.convoyVehicles && Array.isArray(data.convoyVehicles)) {
            this.convoyVehicles = data.convoyVehicles
              .map((id) => this.vehicles.find((v) => v.id === id))
              .filter((v) => v);
          } else {
            this.convoyVehicles = [];
          }

          this.saveToStorage();
          this.updateUI();
          this.showMessage("Data imported successfully!", "success");
        } else {
          throw new Error("Invalid file format");
        }
      } catch (error) {
        this.showMessage("Failed to import data: " + error.message, "error");
      }
    };

    reader.readAsText(file);
  }

  // Helper Methods

  getConditionColor(conditionState) {
    const colors = {
      Pristine: "#28a745",
      Good: "#6f42c1",
      Damaged: "#ffc107",
      "Heavily Damaged": "#fd7e14",
      Critical: "#dc3545",
      Destroyed: "#6c757d",
    };
    return colors[conditionState] || "#6c757d";
  }

  getConditionPenalties(conditionState) {
    const penalties = {
      Pristine: "",
      Damaged: " • +1 FC, PWR Disadvantage",
      "Heavily Damaged": " • Half Speed, +2 FC, 2× MC",
      Critical: " • No Movement, +3 FC, 3× MC",
      Destroyed: " • Inoperable",
    };
    return penalties[conditionState] || "";
  }

  getStatDisplay(currentValue, baseValue) {
    if (!baseValue || currentValue === baseValue) {
      return currentValue;
    }

    if (currentValue > baseValue) {
      return `<span style="color: #dc3545;">${currentValue}</span> <small style="color: #6c757d;">(${baseValue})</small>`;
    } else {
      return `<span style="color: #dc3545;">${currentValue}</span> <small style="color: #6c757d;">(${baseValue})</small>`;
    }
  }

  getDisadvantageIndicator(conditionState, statType) {
    const disadvantages = {
      Damaged: { PWR: true },
      "Heavily Damaged": { MAN: true, PWR: true },
      Critical: { MAN: true, PWR: true, ALL: true },
    };

    const condition = disadvantages[conditionState];
    if (condition && (condition[statType] || condition.ALL)) {
      return ' <small style="color: #dc3545;">⚠</small>';
    }
    return "";
  }

  showVehicleDetails(vehicleId) {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    this.calculator.initializeCondition(vehicle);
    this.calculator.initializeCargo(vehicle);

    // Create modal
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.style.cssText = `
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: rgba(0,0,0,0.7);
       display: flex;
       justify-content: center;
       align-items: center;
       z-index: 1000;
     `;

    modal.innerHTML = `
       <div class="modal-content" style="
         background: white;
         border-radius: 12px;
         padding: 20px;
         max-width: 800px;
         max-height: 90vh;
         overflow-y: auto;
         width: 90%;
       ">
         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
           <h2>${vehicle.displayName}</h2>
           <button onclick="this.closest('.modal-overlay').remove()" style="
             background: none;
             border: none;
             font-size: 24px;
             cursor: pointer;
             color: #666;
           ">&times;</button>
         </div>

         <!-- Tabs -->
         <div class="tabs" style="display: flex; border-bottom: 2px solid #e9ecef; margin-bottom: 20px;">
           <button class="tab-btn active" onclick="app.switchTab(event, 'condition')" style="
             padding: 10px 20px;
             border: none;
             background: none;
             cursor: pointer;
             border-bottom: 2px solid transparent;
           ">Condition</button>
           <button class="tab-btn" onclick="app.switchTab(event, 'cargo')" style="
             padding: 10px 20px;
             border: none;
             background: none;
             cursor: pointer;
             border-bottom: 2px solid transparent;
           ">Cargo</button>
           <button class="tab-btn" onclick="app.switchTab(event, 'history')" style="
             padding: 10px 20px;
             border: none;
             background: none;
             cursor: pointer;
             border-bottom: 2px solid transparent;
           ">History</button>
         </div>

         <!-- Condition Tab -->
         <div id="condition-tab" class="tab-content">
           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div>
                 <h3>Current Condition</h3>
                 <div style="padding: 15px; background: ${this.getConditionColor(
                   vehicle.condition.conditionState
                 )}; color: white; border-radius: 8px; text-align: center;">
                   <div style="font-size: 18px; font-weight: bold;">${
                     vehicle.condition.conditionState
                   }</div>
                   <div>${vehicle.condition.currentDurability}/${
      vehicle.condition.maxDurability
    } Durability</div>
                   <div style="font-size: 12px; margin-top: 5px; opacity: 0.9;">
                     ${this.getConditionPenalties(
                       vehicle.condition.conditionState
                     ).replace(" • ", "")}
                   </div>
                 </div>
               </div>
             <div>
               <h3>Apply Damage</h3>
               <input type="number" id="damageAmount" placeholder="Damage amount" min="1" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
               <input type="text" id="damageSource" placeholder="Damage source" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
               <button onclick="app.applyDamageFromModal('${
                 vehicle.id
               }')" class="btn btn-danger" style="width: 100%;">Apply Damage</button>
             </div>
           </div>
           
           <div>
             <h3>Perform Maintenance</h3>
             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
               <input type="number" id="repairAmount" placeholder="Repair amount" min="1" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
               <input type="number" id="partsCost" placeholder="Parts cost" min="0" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
               <input type="number" id="timeSpent" placeholder="Time (hours)" min="0" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
               <input type="text" id="maintenanceNotes" placeholder="Notes" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
             </div>
             <button onclick="app.performMaintenanceFromModal('${
               vehicle.id
             }')" class="btn btn-success" style="width: 100%;">Perform Maintenance</button>
           </div>
         </div>

         <!-- Cargo Tab -->
         <div id="cargo-tab" class="tab-content" style="display: none;">
           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
             <div>
               <h3>Cargo Status</h3>
               <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
                 <div><strong>Current Load:</strong> ${
                   vehicle.cargo.currentLoad
                 }/${vehicle.cargo.maxCapacity} units</div>
                 <div><strong>Available Space:</strong> ${
                   vehicle.cargo.maxCapacity - vehicle.cargo.currentLoad
                 } units</div>
                 <div><strong>Items:</strong> ${
                   vehicle.cargo.items.length
                 }</div>
               </div>
             </div>
             <div>
               <h3>Add Cargo</h3>
               <input type="text" id="cargoName" placeholder="Item name" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
               <input type="number" id="cargoWeight" placeholder="Weight (units)" min="0.1" step="0.1" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
               <select id="cargoCategory" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
                 <option value="General">General</option>
                 <option value="Food">Food</option>
                 <option value="Fuel">Fuel</option>
                 <option value="Parts">Parts</option>
                 <option value="Weapons">Weapons</option>
                 <option value="Medical">Medical</option>
               </select>
               <button onclick="app.addCargoFromModal('${
                 vehicle.id
               }')" class="btn btn-success" style="width: 100%;">Add Cargo</button>
             </div>
           </div>
           
           <div>
             <h3>Current Cargo</h3>
             <div id="cargoList-${
               vehicle.id
             }" style="max-height: 200px; overflow-y: auto;">
               ${this.renderCargoList(vehicle)}
             </div>
           </div>
         </div>

         <!-- History Tab -->
         <div id="history-tab" class="tab-content" style="display: none;">
           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
             <div>
               <h3>Damage History</h3>
               <div style="max-height: 300px; overflow-y: auto;">
                 ${this.renderDamageHistory(vehicle)}
               </div>
             </div>
             <div>
               <h3>Maintenance History</h3>
               <div style="max-height: 300px; overflow-y: auto;">
                 ${this.renderMaintenanceHistory(vehicle)}
               </div>
             </div>
           </div>
         </div>
       </div>
     `;

    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  switchTab(event, tabName) {
    // Remove active class from all tabs
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
      btn.style.borderBottomColor = "transparent";
    });

    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.style.display = "none";
    });

    // Show selected tab
    event.target.classList.add("active");
    event.target.style.borderBottomColor = "#667eea";
    document.getElementById(tabName + "-tab").style.display = "block";
  }

  renderCargoList(vehicle) {
    if (vehicle.cargo.items.length === 0) {
      return '<div style="text-align: center; color: #666; padding: 20px;">No cargo loaded</div>';
    }

    return vehicle.cargo.items
      .map(
        (item) => `
       <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
         <div>
           <div style="font-weight: bold;">${item.name}</div>
           <div style="font-size: 12px; color: #666;">${item.category} • ${
          item.weight
        } units</div>
           ${
             item.notes
               ? `<div style="font-size: 11px; color: #888;">${item.notes}</div>`
               : ""
           }
         </div>
         <button onclick="app.removeCargoFromModal('${vehicle.id}', '${
          item.id
        }')" class="btn btn-danger btn-small">Remove</button>
       </div>
     `
      )
      .join("");
  }

  renderDamageHistory(vehicle) {
    if (vehicle.condition.damageHistory.length === 0) {
      return '<div style="text-align: center; color: #666; padding: 20px;">No damage recorded</div>';
    }

    return vehicle.condition.damageHistory
      .slice(-10)
      .reverse()
      .map(
        (damage) => `
       <div style="padding: 10px; border-bottom: 1px solid #eee;">
         <div style="font-weight: bold; color: #dc3545;">-${
           damage.amount
         } damage</div>
         <div style="font-size: 12px; color: #666;">
           ${new Date(damage.date).toLocaleDateString()} • ${damage.type} • ${
          damage.source
        }
         </div>
         <div style="font-size: 11px; color: #888;">Durability after: ${
           damage.durabilityAfter
         }</div>
       </div>
     `
      )
      .join("");
  }

  renderMaintenanceHistory(vehicle) {
    if (vehicle.condition.maintenanceHistory.length === 0) {
      return '<div style="text-align: center; color: #666; padding: 20px;">No maintenance recorded</div>';
    }

    return vehicle.condition.maintenanceHistory
      .slice(-10)
      .reverse()
      .map(
        (maintenance) => `
       <div style="padding: 10px; border-bottom: 1px solid #eee;">
         <div style="font-weight: bold; color: #28a745;">+${
           maintenance.repairAmount
         } repair</div>
         <div style="font-size: 12px; color: #666;">
           ${new Date(maintenance.date).toLocaleDateString()} • ${
          maintenance.timeSpent
        }h • ${maintenance.partsCost} parts
         </div>
         ${
           maintenance.notes
             ? `<div style="font-size: 11px; color: #888;">${maintenance.notes}</div>`
             : ""
         }
         <div style="font-size: 11px; color: #888;">Durability after: ${
           maintenance.durabilityAfter
         }</div>
       </div>
     `
      )
      .join("");
  }

  applyDamageFromModal(vehicleId) {
    const damageAmount = parseInt(
      document.getElementById("damageAmount").value
    );
    const damageSource =
      document.getElementById("damageSource").value || "Unknown";

    if (!damageAmount || damageAmount <= 0) {
      this.showMessage("Please enter a valid damage amount", "error");
      return;
    }

    this.applyDamageToVehicle(
      vehicleId,
      damageAmount,
      "Physical",
      damageSource
    );

    // Close and reopen modal to refresh
    document.querySelector(".modal-overlay").remove();
    setTimeout(() => this.showVehicleDetails(vehicleId), 100);
  }

  performMaintenanceFromModal(vehicleId) {
    const repairAmount = parseInt(
      document.getElementById("repairAmount").value
    );
    const partsCost = parseInt(document.getElementById("partsCost").value) || 0;
    const timeSpent = parseInt(document.getElementById("timeSpent").value) || 0;
    const notes = document.getElementById("maintenanceNotes").value || "";

    if (!repairAmount || repairAmount <= 0) {
      this.showMessage("Please enter a valid repair amount", "error");
      return;
    }

    this.performMaintenanceOnVehicle(
      vehicleId,
      repairAmount,
      partsCost,
      timeSpent,
      notes
    );

    // Close and reopen modal to refresh
    document.querySelector(".modal-overlay").remove();
    setTimeout(() => this.showVehicleDetails(vehicleId), 100);
  }

  addCargoFromModal(vehicleId) {
    const itemName = document.getElementById("cargoName").value;
    const weight = parseFloat(document.getElementById("cargoWeight").value);
    const category = document.getElementById("cargoCategory").value;

    if (!itemName || !weight || weight <= 0) {
      this.showMessage("Please enter valid cargo details", "error");
      return;
    }

    this.addCargoToVehicle(vehicleId, itemName, weight, category);

    // Refresh cargo list
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      document.getElementById(`cargoList-${vehicleId}`).innerHTML =
        this.renderCargoList(vehicle);
    }

    // Clear form
    document.getElementById("cargoName").value = "";
    document.getElementById("cargoWeight").value = "";
  }

  removeCargoFromModal(vehicleId, itemId) {
    this.removeCargoFromVehicle(vehicleId, itemId);

    // Refresh cargo list
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      document.getElementById(`cargoList-${vehicleId}`).innerHTML =
        this.renderCargoList(vehicle);
    }
  }

  planTravel() {
    const distance = parseFloat(
      document.getElementById("travelDistance").value
    );
    const terrainModifier = parseFloat(
      document.getElementById("terrainModifier").value
    );
    const weatherModifier = parseFloat(
      document.getElementById("weatherModifier").value
    );

    if (!distance || distance <= 0) {
      this.showMessage("Please enter a valid distance", "error");
      return;
    }

    const travelPlan = this.calculateTravelPlan(
      distance,
      terrainModifier,
      weatherModifier
    );

    if (!travelPlan) {
      return; // Error message already shown
    }

    // Update UI with results
    document.getElementById("travelSpeed").textContent =
      travelPlan.effectiveSpeed;
    document.getElementById("travelDays").textContent =
      travelPlan.travelTime.totalDays;
    document.getElementById("travelFuel").textContent =
      travelPlan.fuel.required;
    document.getElementById("travelSummary").textContent = travelPlan.summary;

    // Show results section
    document.getElementById("travelResults").style.display = "block";

    this.showMessage("Travel plan calculated successfully!", "success");
  }
}

// Initialize the application when the page loads
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new ConvoyApp();

  // Add export/import buttons to the header
  const header = document.querySelector(".header");
  const exportImportDiv = document.createElement("div");
  exportImportDiv.style.cssText =
    "margin-top: 15px; display: flex; gap: 10px; justify-content: center;";
  exportImportDiv.innerHTML = `
        <button class="btn btn-primary" onclick="app.exportData()">Export Data</button>
        <label class="btn btn-primary" style="cursor: pointer;">
            Import Data
            <input type="file" accept=".json" onchange="app.importData(event)" style="display: none;">
        </label>
    `;
  header.appendChild(exportImportDiv);
});
